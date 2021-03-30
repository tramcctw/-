import React from "react";
import { IMovieState } from "../redux/movie/slice";
import { connect } from "react-redux";
import { Button, Switch, Table, Modal, Space, Input } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { IMovie } from "../services/interface";
import { appActions, appMapDispatchProps } from "../redux/core";
import { IInitAppState } from "../redux/index";
import defaultImg from "../assets/defaultImg.jpg";
import styled from "styled-components";
import { SwitchType } from "../services/interface";
import { NavLink } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

const ImgContainer = styled.img`
  width: 50px;
  height: 60px;
`;

function mapStateToProps(state: IInitAppState) {
  return {
    datas: state.movie.datas,
    total: state.movie.total,
    condition: state.movie.condition,
    isLoading: state.movie.isLoading
  };
}

class MovieTable extends React.Component<IMovieState & typeof appActions> {
  state = {
    inputMsg: ''
  }
  componentDidMount() {
    this.props.getConditionMovies();
    this.props.setEditMovie({})
  }

  private confirm = (id: string) => {
    Modal.confirm({
      title: "确定要删除吗？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        this.props.deleteOriginMovie({ id });
      },
    });
  };

  private clearInputText = (clearFilters) => {
    clearFilters();
    this.setState({
      inputMsg: ''
    }, () => {
      this.handleSearch(true)
    })
  }

  private handleSearch = (key: boolean) => {
    console.log(this.state.inputMsg)
    if (key) {
      this.props.setCondition({ key: '' })
    } else {
      this.props.setCondition({ key: this.state.inputMsg })
    }
    this.props.getConditionMovies()
  }

  private getFilterDropDown({ setSelectedKeys, selectedKeys, confirm, clearFilters }) {
    return (<div style={{ padding: 8 }}>
      <Input
        placeholder={`Search`}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
        value={this.state.inputMsg}
        onChange={(e) => {
          this.setState({
            inputMsg: e.target.value
          })
        }}
        onPressEnter={() => { this.handleSearch(false) }}
      />
      <Space>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
          onClick={(e) => {
            this.handleSearch(false)
          }}
        >
          搜索
        </Button>
        <Button size="small" onClick={() => { this.clearInputText(clearFilters) }} style={{ width: 90 }}>
          重置
        </Button>
      </Space>
    </div >)
  }

  private getColumns(): ColumnsType<IMovie> {
    return [
      {
        title: "封面",
        dataIndex: "poster",
        render(poster) {
          if (poster) {
            return <ImgContainer src={poster} />;
          } else {
            return <ImgContainer src={defaultImg} />;
          }
        },
      },
      {
        title: "名称",
        dataIndex: "name",
        filterDropdown: this.getFilterDropDown.bind(this),
        filterIcon: <SearchOutlined />
      },
      {
        title: "地区",
        dataIndex: "areas",
        render(text: string[]) {
          return text.join(" ");
        },
      },
      {
        title: "类型",
        dataIndex: "types",
        render(text: string[]) {
          return text.join("  ");
        },
      },
      {
        title: "时长",
        dataIndex: "timeLong",
        render(timeLong) {
          return timeLong + "分钟";
        },
      },
      {
        title: "正在热映",
        dataIndex: "isHot",
        render: (isHot, record) => {
          return (
            <Switch
              checked={isHot}
              onChange={(checked) => {
                this.props.setSwitchType({
                  id: record._id,
                  type: SwitchType["isHot"],
                  checked: checked,
                });
              }}
            />
          );
        },
      },
      {
        title: "即将热映",
        dataIndex: "isComming",
        render: (isComming, record) => {
          return (
            <Switch
              checked={isComming}
              onChange={(checked) => {
                this.props.setSwitchType({
                  id: record._id,
                  type: SwitchType["isComming"],
                  checked: checked,
                });
              }}
            />
          );
        },
      },
      {
        title: "经典影片",
        dataIndex: "isClassic",
        render: (isClassic, record) => {
          return (
            <Switch
              checked={isClassic}
              onChange={(checked) => {
                this.props.setSwitchType({
                  id: record._id,
                  type: SwitchType["isClassic"],
                  checked: checked,
                });
              }}
            />
          );
        },
      },
      {
        title: "操作",
        dataIndex: "_id",
        render: (id: string) => {
          return (
            <>
              <NavLink to={`/movie/edit/${id}`}>
                <Button type="primary">编辑</Button>
              </NavLink>

              <Button
                type="default"
                onClick={() => {
                  this.confirm(id);
                }}
              >
                删除
              </Button>
            </>
          );
        },
      },
    ];
  }

  getPageConfig(): false | TablePaginationConfig {
    if (this.props.total === 0) {
      return false;
    }
    return {
      current: this.props.condition.page,
      pageSize: this.props.condition.limit,
      total: this.props.total,
    };
  }

  handleChange(pagination: TablePaginationConfig) {
    this.props.setCondition({ page: pagination.current, limit: pagination.pageSize })
    this.props.getConditionMovies()
  }

  render() {
    return (
      <Table
        pagination={this.getPageConfig()}
        rowKey="_id"
        dataSource={this.props.datas}
        columns={this.getColumns()}
        onChange={(pagination: TablePaginationConfig) => {
          this.handleChange(pagination)
        }}
        loading={this.props.isLoading}
      ></Table>
    );
  }
}

export default connect(mapStateToProps, appMapDispatchProps)(MovieTable);
