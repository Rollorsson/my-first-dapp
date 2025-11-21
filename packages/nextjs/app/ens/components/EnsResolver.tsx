"use client";

import { useState } from "react";
import { useEnsAddress, useEnsName } from "wagmi";
import { isAddress } from "viem";

export function EnsResolver() {
  const [inputValue, setInputValue] = useState("");

  const isValueAddress = isAddress(inputValue);

  const { data: ensName, isLoading: isLoadingName } = useEnsName({
    address: inputValue as `0x${string}`,
    chainId: 1, // ENS is on Ethereum Mainnet
    query: {
      enabled: isValueAddress,
    },
  });

  const { data: ensAddress, isLoading: isLoadingAddress } = useEnsAddress({
    name: inputValue,
    chainId: 1, // ENS is on Ethereum Mainnet
    query: {
      enabled: !isValueAddress && inputValue.includes("."),
    },
  });

  const isLoading = isLoadingName || isLoadingAddress;

  const renderResult = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-24">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      );
    }

    if (isValueAddress) {
      return (
        <div>
          <h3 className="font-bold text-lg">Resolved ENS Name:</h3>
          <p className="font-mono text-base-content/80 break-all">
            {ensName || "No ENS name found for this address."}
          </p>
        </div>
      );
    }

    if (!isValueAddress && inputValue.includes(".")) {
      return (
        <div>
          <h3 className="font-bold text-lg">Resolved Address:</h3>
          <p className="font-mono text-base-content/80 break-all">
            {ensAddress || "Could not resolve this ENS name."}
          </p>
        </div>
      );
    }

    return (
      <div className="text-center text-base-content/60 h-24 flex items-center justify-center">
        <p>Enter an ENS name (e.g., vitalik.eth) or an address.</p>
      </div>
    );
  };

  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body gap-6">
        <div>
          <input
            type="text"
            placeholder="vitalik.eth or 0x..."
            className="input input-bordered input-lg w-full text-center"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className="bg-base-300 rounded-xl p-6 min-h-[8rem]">
          {renderResult()}
        </div>
      </div>
    </div>
  );
}
