"use client";

import { useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { CHAINLINK_ABI } from "./ChainlinkAbi";

// CELO/USD Price Feed on Celo Mainnet
const CHAINLINK_DATA_FEED_ADDRESS = "0x73353801921417Ab4c385513712Aa66336467896";

export function CeloPrice() {
  const {
    data: priceData,
    isLoading,
    error,
  } = useReadContract({
    address: CHAINLINK_DATA_FEED_ADDRESS,
    abi: CHAINLINK_ABI,
    functionName: "latestRoundData",
    watch: true, // Automatically refetches when data changes
  });

  const formatPrice = () => {
    if (!priceData) return "...";
    // priceData is a tuple: [roundId, answer, startedAt, updatedAt, answeredInRound]
    const price = priceData[1];
    // The CELO/USD feed has 8 decimals
    return `$${Number(formatUnits(price, 8)).toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-bold text-sm">CELO Price:</span>
        <span className="loading loading-spinner loading-xs"></span>
      </div>
    );
  }

  if (error) {
    console.error("Chainlink price fetch error:", error);
    return (
      <div className="flex items-center gap-2" title="Failed to load price">
        <span className="font-bold text-sm">CELO Price:</span>
        <span className="font-mono text-sm text-error">Error</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-bold text-sm">CELO Price:</span>
      <span className="font-mono text-sm">{formatPrice()}</span>
    </div>
  );
}
