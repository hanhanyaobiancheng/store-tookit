import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Table} from 'antd';

export default class SortTable extends Component {
    static defaultProps = {
        onSearch: () => {},
    };

    static propTypes = {
        onSearch: PropTypes.func,
    };

    state = {};

    render() {
        const {orderName, orderType} = this.state;
        const {columns} = this.props;
        columns.map(item => {
            if (item.isSort) {
                item.title = (
                    <div style={{position: 'relative'}}>
                        <span className="ant-table-column-title">{item.title}</span>
                        <span className="ant-table-column-sorter">
                            <div
                                title="排序"
                                className="ant-table-column-sorter-inner ant-table-column-sorter-inner-full"
                            >
                                <i
                                    style={{cursor: 'pointer'}}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        this.setState({orderName: item.dataIndex, orderType: 1});
                                        this.props.onSearch({orderName: item.dataIndex, orderType: 1});
                                    }}
                                    aria-label="图标: caret-up"
                                    className={`anticon anticon-caret-up ant-table-column-sorter-up ${orderName === item.dataIndex && orderType === 1 ? 'on' : 'off'}`}>
                                    <svg
                                        viewBox="0 0 1024 1024"
                                        className=""
                                        data-icon="caret-up"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
                                        />
                                    </svg>
                                </i>
                                <i
                                    style={{cursor: 'pointer'}}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        this.setState({orderName: item.dataIndex, orderType: 2});
                                        this.props.onSearch({orderName: item.dataIndex, orderType: 2});
                                    }}
                                    aria-label="图标: caret-down"
                                    className={`anticon anticon-caret-down ant-table-column-sorter-down ${orderName === item.dataIndex && orderType === 2 ? 'on' : 'off'}`}
                                >
                                    <svg
                                        viewBox="0 0 1024 1024"
                                        className=""
                                        data-icon="caret-down"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
                                        />
                                    </svg>
                                </i>
                            </div>
                        </span>
                    </div>
                );
            }
            return item;
        });
        return (
            <Table
                {...this.props}
                columns={columns}
            />
        );
    }
}
