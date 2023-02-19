// Step 1: Import the crypto getRandomValues shim (**BEFORE** the ethers shims)
import "react-native-get-random-values";
// Step 2: Import the ethers shims (**BEFORE** the thirdweb SDK)
import "@ethersproject/shims";
// Step 3: Import the thirdweb SDK
import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk";
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { useWalletConnect } from '@walletconnect/react-native-dapp';

const sdk = new ThirdwebSDK("polygon");
const MARRIAGE_NFT_COLLECTION_ID = "0x38ccD5B179Db21e8C896704cb019af3AF9Eeb89F"
const SUPER_PRIVATE_KEY = "add_your_wallets_really_long_private_key_here"

export const AppContext = createContext<{
    claimNFTtoCurrentWallet: () => void
    currentWalletAddress: string
    setCurrentWalletAddress: () => void
    currentNFTsInWallet: any[]
    connector: any
} | any>({});

export const AppProvider = (props: { children: any }) => {

    const [currentWalletAddress, setCurrentWalletAddress] = useState<string>("")
    const [currentNFTsInWallet, setCurrentNFTsInWallet] = useState<NFT[]>([])
    const [allMarriageNFTs, setAllMarriageNFTs] = useState<NFT[]>([])
    const connector = useWalletConnect();

    useEffect(() => {
        // GET LIST OF MARRIAGE NFTs IN CURRENT USER'S WALLET
        if (currentWalletAddress) {
            const getOwnedNFTs = async () => {
                const marriageNFTCollection = await sdk.getContract(MARRIAGE_NFT_COLLECTION_ID, "edition-drop");
                const nfts = await marriageNFTCollection.getOwned(currentWalletAddress);
                setCurrentNFTsInWallet(nfts)
            }
            getOwnedNFTs()
        }
        // GET LIST OF ALL EXISTING MINTED MARRIAGE NFTS (no matter who owns them)
        if (MARRIAGE_NFT_COLLECTION_ID) {
            const loadNFTS = async () => {
                const marriageNFTCollection = await sdk.getContract(MARRIAGE_NFT_COLLECTION_ID);
                return await marriageNFTCollection.erc1155.getAll();
            };
            loadNFTS().then((_nfts) => {
                setAllMarriageNFTs(_nfts);
            });
        }
    }, [currentWalletAddress, MARRIAGE_NFT_COLLECTION_ID, sdk]);

    const claimNFTtoCurrentWallet = useCallback(async () => {
        const privateSDK = ThirdwebSDK.fromPrivateKey(SUPER_PRIVATE_KEY, "polygon");
        const marriageNFTCollection = await privateSDK.getContract(MARRIAGE_NFT_COLLECTION_ID, 'edition-drop');
        marriageNFTCollection.erc1155.mintAdditionalSupplyTo(
            currentWalletAddress, // which wallet to send the newly minted NFT(s)
            0, // id of the NFT (in this case, zero because there's currently only one NFT in the Marriage collection)
            1 // quantity of this NFT to mint & add to current user's wallet
        );
    }, [currentWalletAddress, MARRIAGE_NFT_COLLECTION_ID, SUPER_PRIVATE_KEY])

    // const conditions = [
    //     {
    //         startTime: new Date(),
    //         price: 0,
    //         trait_type: "married",
    //         value: "true"
    //     },
    // ];
    // await marriageNFTCollection.claimConditions.set(0, conditions)

    return (
        <AppContext.Provider value={{
            currentWalletAddress,
            setCurrentWalletAddress,
            claimNFTtoCurrentWallet,
            currentNFTsInWallet,
            connector
        }}>
            {props.children}
        </AppContext.Provider >
    )
};

export default AppProvider;