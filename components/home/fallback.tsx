import React from 'react';
import DataTable from "@/components/DataTable";
import {DataTableColumn} from "@/type.d";
import {cn} from "@/lib/utils";

export const CoinOverviewFallback = () => {
    return (
        <div id="coin-overview-fallback" className="animate-pulse">
            <div className="header mt-6 md:mt-8 px-4 md:px-6">
                <div className="header-image bg-dark-400"/>
                <div className="info">
                    <div className="header-line-sm bg-dark-400 rounded-sm"/>
                    <div className="header-line-lg bg-dark-400 rounded-sm"/>
                </div>
            </div>

            <div className="flex gap-2 px-4 md:px-6 mt-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="period-button-skeleton bg-dark-400"/>
                ))}
            </div>

            <div className="chart px-4 md:px-6 mt-4 pb-4">
                <div className="chart-skeleton bg-dark-400"/>
            </div>
        </div>
    );
};

export const TrendingCoinsFallback = () => {
    const columns: DataTableColumn<any>[] = [
        {
            header: '#',
            cell: (_, index) => <div className="w-4 h-4 bg-dark-400 rounded-sm"/>,
        },
        {
            header: 'Name',
            cell: () => (
                <div className="name-link">
                    <div className="name-image bg-dark-400"/>
                    <div className="name-line bg-dark-400 rounded-sm"/>
                </div>
            ),
            cellClassName: 'name-cell',
        },
        {
            header: 'Price',
            cell: () => <div className="price-line bg-dark-400 rounded-sm"/>,
            cellClassName: 'price-cell',
        },
        {
            header: '24h Change',
            cell: () => (
                <div className="price-change">
                    <div className="change-icon bg-dark-400"/>
                    <div className="change-line bg-dark-400 rounded-sm"/>
                </div>
            ),
            cellClassName: 'change-cell',
        },
    ];

    const data = Array(5).fill({});

    return (
        <div id="trending-coins-fallback" className="animate-pulse">
            <h4 className="text-purple-100">Trending Coins</h4>
            <div className="trending-coins-table">
                <DataTable
                    columns={columns}
                    data={data}
                    rowKey={(_, index) => index.toString()}
                />
            </div>
        </div>
    );
};
