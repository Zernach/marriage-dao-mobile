// Step 1: Import the crypto getRandomValues shim (**BEFORE** the ethers shims)
import "react-native-get-random-values";
// Step 2: Import the ethers shims (**BEFORE** the thirdweb SDK)
import "@ethersproject/shims";
// Step 3: Import the thirdweb SDK
import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk";
import React, { createContext, useCallback, useEffect, useState } from 'react'

export const AppContext = createContext<{
    claimNFTtoCurrentWallet: () => void
    currentWalletAddress: string
    setCurrentWalletAddress: () => void
    currentNFTsInWallet: any[]
} | any>({});

export const AppProvider = (props: { children: any }) => {
    const [currentWalletAddress, setCurrentWalletAddress] = useState<string>("")
    const [currentNFTsInWallet, setCurrentNFTsInWallet] = useState(null)
    const MARRIAGE_NFT_ID = "0x38ccD5B179Db21e8C896704cb019af3AF9Eeb89F"
    const [nfts, setNFTS] = useState<NFT[]>([]);

    useEffect(() => {
        if (currentWalletAddress) {
            const sdk = new ThirdwebSDK("polygon");
            const loadNFTS = async () => {
                const contract = await sdk.getContract(MARRIAGE_NFT_ID);
                return await contract.erc1155.getAll();
            };
            const getOwnedNFTs = async () => {
                const ownedContract = await sdk.getContract(MARRIAGE_NFT_ID, "edition-drop");
                const nfts = await ownedContract.getOwned(currentWalletAddress);
                setCurrentNFTsInWallet(nfts)
            }
            loadNFTS().then((_nfts) => {
                setNFTS(_nfts);
            });
            getOwnedNFTs()
        }
    }, [currentWalletAddress]);

    console.log('currentWalletAddress', currentWalletAddress)

    const claimNFTtoCurrentWallet = useCallback(async () => {
        const sdk = new ThirdwebSDK("polygon");
        const contract = await sdk.getContract(MARRIAGE_NFT_ID, "edition-drop");
        const quantity = 1; // how many NFTs you want to claim
        const tx = await contract.claimTo(currentWalletAddress, MARRIAGE_NFT_ID, quantity);
        // const receipt = tx.receipt; // the transaction receipt
        console.log('receipt', {
            tx
        })
    }, [currentWalletAddress])

    return (
        <AppContext.Provider value={{
            currentWalletAddress,
            setCurrentWalletAddress,
            claimNFTtoCurrentWallet,
            currentNFTsInWallet
        }}>
            {props.children}
        </AppContext.Provider >
    )
};

export default AppProvider;

