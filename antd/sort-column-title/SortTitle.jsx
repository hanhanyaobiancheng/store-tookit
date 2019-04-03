import React, {Component} from 'react';

export default class SortTitle extends Component {
    static defaultProps = {
        sortOrder: false, // 'ascend' 'descend'
    };

    handleClick = (order) => {
        let {sortOrder} = this.props;
        sortOrder = sortOrder === 'ascend' ? 'descend' : 'ascend';
        if (order) {
            sortOrder = order;
        }
        this.props.onClick && this.props.onClick(sortOrder);
    };

    render() {
        const {sortOrder, children} = this.props;
        return (
            <div
                style={{cursor: 'pointer'}}
                onClick={() => this.handleClick()}
            >
                <div style={{display: 'inline-block'}}>{children}</div>
                <div
                    className="ant-table-column-sorter"
                >
                    <span
                        className={`ant-table-column-sorter-up ${sortOrder === 'ascend' ? 'on' : 'off'}`}
                        title="↑"
                        onClick={(e) => {
                            e.stopPropagation();
                            this.handleClick('ascend');
                        }}
                    >
                        <i className="anticon anticon-caret-up"/>
                    </span>
                    <span
                        className={`ant-table-column-sorter-down ${sortOrder === 'descend' ? 'on' : 'off'}`}
                        title="↓"
                        onClick={(e) => {
                            e.stopPropagation();
                            this.handleClick('descend');
                        }}
                    >
                        <i className="anticon anticon-caret-down"/>
                    </span>
                </div>
            </div>
        );
    }
}

/**
 * 处理columns 的工具函数，如果 含有 isSort: true 则进行排序包装
 * 点击之后，触发handleSort(sortOrder, dataIndex) 函数，调用者可以用来发请求或本地排序等
 * @param columns
 * @param handleSort
 */
export function sortColumns({columns, onSort, sortData}) {
    let {sortDataIndex, sortOrder} = sortData;
    return columns.map(item => {
        let {title, isSort, dataIndex} = item;

        sortOrder = sortDataIndex === dataIndex ? sortOrder : false;

        const sortTitle = (
            <SortTitle
                sortOrder={sortOrder}
                onClick={(so) => {
                    onSort(so, dataIndex);
                }}
            >{title}</SortTitle>
        );

        return isSort ? {...item, title: sortTitle} : item;
    });
}
