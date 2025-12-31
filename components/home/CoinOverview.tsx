import {fetcher} from "@/lib/coingecko.actions";
import Image from "next/image";
import {formatCurrency} from "@/lib/utils";
import {CoinOverviewFallback} from "@/components/home/fallback";

const CoinOverview = async () => {
    let coin;

    try {
        coin = await fetcher<CoinDetailsData>('/coins/bitcoin',
            {
                dex_pair_format: 'symbol',
            })
    } catch (error) {
        console.error('Error fetching coin overview: ', error ?? 'Unknown error')
        return <CoinOverviewFallback/>
    }

    return (
        <div id="coin-overview">
            <div className="header pt-2">
                <Image src={coin.image.large} alt={coin.name ?? "Coin"}
                       width={56} height={56}/>
                <div className="info">
                    <p>{coin.name ?? '—'} / {coin.symbol?.toUpperCase() ?? '—'}</p>
                    <h1>{formatCurrency(coin.market_data?.current_price?.usd ?? 0)}</h1>
                </div>
            </div>
        </div>
    )
}

export default CoinOverview
