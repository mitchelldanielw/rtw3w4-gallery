import Head from 'next/head'
import Image from 'next/image'
import { useState } from "react"
import { NFTCard } from "../components/nftCard"



export default function Home() {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs]= useState([]);
  const [fetchForCollection, setFetchForCollection]=useState("");
  const [startToken, setStartToken] = useState('');
  const [pageKey, setPageKey]=useState('');

  const fetchNFTs = async() => {
    let nfts; 
    console.log("fetching nfts");
    const api_key = process.env.NEXT_PUBLIC_API_KEY;
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
    var requestOptions = {
        method: 'GET'
      };
     
    if (!collection.length) {
    
      const fetchURL = `${baseURL}?owner=${wallet}`;
  
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      console.log("Fetching address owned NFTs collection:")
      const fetchURL="";
      if(pageKey ==''){
        fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      
    }
    else{
      fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}?pageKey=${pageKey}`;
    }
      nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
    }
  
    if (nfts) {
      console.log("nfts:", nfts)
      if(NFTs.length >0){
      setNFTs([...NFTs,...nfts.ownedNfts])}
      else{
        setNFTs(nfts.ownedNfts);
      }
      if(nfts.pageKey){
        setPageKey(nfts.pageKey)
      }
      else{
        setPageKey('');
      }
    }
  }
  
  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET'
      };
      const api_key = process.env.NEXT_PUBLIC_API_KEY;
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}&startToken=${startToken}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log(nfts.nextToken)
        if(nfts.nextToken){
          setStartToken(nfts.nextToken)
        }
        else{
          setStartToken('');
        }
        console.log(NFTs.length)
        console.log(" Collection NFTs: ", nfts)
        if(NFTs.length >0){
          setNFTs([...NFTs,...nfts.nfts])
        }else{
          setNFTs(nfts.nfts)
        }
        
      }
    }
  }
  
  
  return (
    <div className="bg-slate-900 flex flex-col items-center justify-center h-full">
      <div className="flex flex-col w-full justify-center items-center">
        <a title="Alchemy Road to Web3 Week4" className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 text-6xl text-center font-bold ..." target={"_blank"} href="https://docs.alchemy.com/docs/how-to-create-an-nft-gallery">RTW3 Week4 (NFT GALLERY)</a>
        <span className="py-3 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 text-5xl font-bold ...">Utilizing Alchemy NFT API</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 text-3xl font-bold ...">(Capable of fetching NFTs based on Wallet + or - Collection address)</span>
        <div>
        <input disabled={fetchForCollection} className="mt-2 px-3 py-2 text-white bg-gradient-to-r from-violet-900 to-fuchsia-600 py-2 px-2 rounded-lg text-white focus:outline-slate-300 placeholder-slate-100 w-full  disabled:cursor-not-allowed" title="Paste Wallet Address" onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} type={"text"} placeholder="Input a wallet address here..."></input>

        <label className="mt-3 px-3 py-3 text-white rounded-lg text-white justify-center"><input onChange={(e)=>{setFetchForCollection(e.target.checked); setWalletAddress("")}} type={"checkbox"} className="mr-1  accent-indigo-900"></input> ← Disable wallet address and search NFT collections only! </label>

          
        <input className="mt-3 px-3 py-2 text-white bg-gradient-to-r from-violet-900 to-fuchsia-600 py-2 px-2 rounded-lg text-white focus:outline-slate-300 placeholder-slate-100 w-full" title="Paste Collection Address" onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} type={"text"} placeholder="Input a collection address here..."></input>
        
        </div>
        <button className={"mt-3 text-white text-2xl justify-center bg-indigo-900 py-1 px-3 rounded-lg w-1/8 rounded-full"} title="Let's go!"> {
           () => {
            setNFTs([])
            if (fetchForCollection) {
              fetchNFTsForCollection()
            }else fetchNFTs();
            setCollectionAddress("");
            setWalletAddress("")
          }
        } Discover NFTs! </button>
      </div>
      <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-6 justify-center">
        {
          NFTs.length && NFTs.map((nft ,index) => {
            return (
              <NFTCard nft={nft} key={index}></NFTCard>
              
            );
          })
        }
      </div>
      {startToken? 
          <button 
            className={"disabled:bg-slate-900 text-white btn px-4 py-2 mt-3 rounded-md w-1/5"}
            onClick={
              () => {
                if (fetchForCollection) {
                  fetchNFTsForCollection()
                }else fetchNFTs()
              }
            }
          >
            Click to see more of this collection ↧
          </button>
          : <></> }
          {pageKey? 
          <button 
            className={"disabled:bg-slate-900 text-white btn px-4 py-2 mt-3 rounded-md w-1/5"}
            onClick={
              () => {
                 fetchNFTs()
              }
            }
          >
            Click to see more of this collection ↧
          </button>
          : <></> }
      
    </div>
  )
}
