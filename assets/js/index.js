
let useraddress;
let replica_contract;
let web3rpc;

function walletmodal(){
    $('#wallet-popup').modal('show');
}

async function enableLinks(){
    try {await enableLink( 4 );} catch (e) { console.log(e)}    
}

async function startmetamsk(){
    await ethereum.enable();
    $('#wallet-popup').modal('hide');
    provider = await new ethers.providers.Web3Provider(window.ethereum);
    signer = await provider.getSigner();
    useraddress = await signer.getAddress();
    web3rpc = await new ethers.providers.JsonRpcProvider("https://rpc-mainnet.maticvigil.com/");
    enableLinks();
}


window.onload = async function() {
    ethereum.on('chainChanged', (_chainId) => window.location.reload());
    $('#wallet-popup').modal('show');
}





//画像左から0,1,2,3,4,5。
async function enableLink( _num ){
    // const web3rpc = await new ethers.providers.JsonRpcProvider("https://rpc-mainnet.maticvigil.com/");
    const mycontract = await new ethers.Contract( nftaddressArray[_num] , abi , web3rpc );
    console.log(useraddress);
    let fromblockchain0 = await mycontract.balanceOf(useraddress);
 //   console.log("bug check")
    if (fromblockchain0==0){
        return;
        //    console.log("bug check2")
        //        throw new Error('I Have No Token.'+ _num );
    } else {

    let fromblockchain1 = await mycontract.tokenOfOwnerByIndex(useraddress , 0);
    console.log(fromblockchain1);
//    tmp = 2;
    document.getElementById('image'+_num).style.opacity = "100%";
    document.getElementById('link'+_num).target = "_blank";
    document.getElementById('link'+_num).href = `https://explorer-mainnet.maticvigil.com/tokens/${nftaddressArray[_num]}/instance/${fromblockchain1}/token-transfers`
    }
}


async function howtoget( _num ){
    document.getElementById('howtogetlink').innerHTML = howtogetmessage[_num];
    document.getElementById('howtogetlink').href = howtogetlink[_num];
    $('#howtogetmodal').modal('show');
}
