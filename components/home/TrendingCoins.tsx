import {fetcher} from "@/lib/coingecko.actions";
import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {TrendingDown, TrendingUp} from "lucide-react";
import DataTable from "@/components/DataTable";
import {TrendingCoinsFallback} from "@/components/home/fallback";


const TrendingCoins = async () => {
    let trendingCoins;

    try {
        trendingCoins = await fetcher<{
            coins: TrendingCoin[]
        }>('/search/trending', undefined, 300)
    } catch (error) {
        console.error('Error fetching trending coins: ', error ?? 'Unknown error');
        return <TrendingCoinsFallback/>
    }

    const columns: DataTableColumn<TrendingCoin>[] = [
        {
            header: "Name", cellClassName: 'change-cell', cell: (coin) => {
                const item = coin.item;
                const fallbackImage = "/fallback-coin.png";

                return (
                    <Link href={`/coins/${item?.id ?? ''}`}>
                        <Image src={item?.large ?? fallbackImage} alt={item?.name ?? "Coin"} width={36} height={36}/>
                        <p>{item?.name ?? '—'}</p>
                    </Link>
                )
            }
        },

        {
            header: '24h Change',
            cellClassName: 'change-cell',
            cell: (coin) => {
                const item = coin.item;
                const priceChange = item?.data?.price_change_percentage_24h?.usd ?? 0;
                const isTrendingUp = priceChange > 0;

                return (
                    <div className={cn('price-change', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
                        <p>
                            {isTrendingUp ? (
                                    <TrendingUp width={16} height={16}/>) :
                                <TrendingDown width={16} height={16}/>
                            }
                        </p>
                        <span>{priceChange.toFixed(2)}%</span>
                    </div>
                )
            }
        },
        {
            header: 'Price',
            cellClassName: 'price-cell',
            cell: (coin) => `$${(coin.item?.data?.price ?? 0).toLocaleString()}`
        },
    ]

    return (
        <div id="trending-coins">
            <h4>Trending Coins</h4>
            <div id="trending-coins">
                <DataTable
                    data={trendingCoins?.coins?.slice(0, 6) ?? []}
                    columns={columns}
                    rowKey={(coin) => coin.item?.id ?? Math.random().toString()}
                    tableClassName="trending-coins-table"
                    headerCellClassName="py-3!"
                    bodyCellClassName="py-2!"
                />
            </div>
        </div>
    )
}
export default TrendingCoins
