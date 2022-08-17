/* eslint-disable no-eval */
export const NFTCard = ({ nft }) => {
        // description will appear on hover of title (used to save nft footprint)
    return (
        
        <div className="flex flex-col w-2/12">
            <div className="rounded-md">
                <img className="object-cover h-128 w-full rounded-t-lg" src={nft.media[0].gateway}/> 
            </div>
            <div className="flex flex-col y-gap-2 px-2 py-3 rounded-b-lg h-110">
                <div >
                    <h2 className="text-center text-lg text-slate-100" title={nft.description}>{nft.title}</h2>
                    <p className="text-slate-300">Id: {nft.id.tokenId.substr(nft.id.tokenId.length-4)}</p>
                    <p className="text-slate-300">Hover over Title to see NFT description details if there are any!</p>
                    <button onClick={() =>  navigator.clipboard.writeText(`${nft.contract.address}`)} className="mt-3 text-indigo-400 text-xl"> ❏ Copy Contract Address ❏ {nft.contract.address.substr(0,4)}......{nft.contract.address.substr(nft.contract.address.length-4)}</button>
                </div>
                <div className="flex justify-center mt-3 mb-2">
                    <a rel="noopener noreferrer" target={"_blank"} href={`https://etherscan.io/address/${nft.contract.address}`} className="btn1" title=" Collection Contract Address">Contract on Etherscan</a>
                    <a rel="noopener noreferrer" target={"_blank"} href={`https://etherscan.io/token/${nft.contract.address}`} className="btn1" title=" Collection Token Address">Token on etherscan</a>
                </div>
            </div>
        </div>
    )
}