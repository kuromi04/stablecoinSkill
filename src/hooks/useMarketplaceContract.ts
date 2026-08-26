import { useTonConnectUI } from '@tonconnect/ui-react';
import { Address, beginCell, toNano } from '@ton/core';
import { useMemo } from 'react';
import { Buffer } from 'buffer';

// Dirección del contrato de Marketplace desplegado en Testnet
const MARKETPLACE_ADDRESS = 'EQCxhChW7krycdlpFSncAD0ZH38nNABbuH_YorLdsjx6MnKm'; 

export function useMarketplaceContract() {
    const [tonConnectUI] = useTonConnectUI();

    const validateInput = (nftAddress: string, priceInTon: string) => {
        let nftAddr: Address;
        try {
            nftAddr = Address.parse(nftAddress);
        } catch (e) {
            throw new Error('Dirección NFT inválida o corrupta.');
        }

        const priceNum = parseFloat(priceInTon);
        if (isNaN(priceNum) || priceNum <= 0) {
            throw new Error('El precio debe ser un número mayor a 0.');
        }
        
        return { nftAddr };
    };

    return useMemo(() => {
        return {
            buySkill: async (nftAddress: string, priceInTon: string) => {
                console.log('Preparando transacción de compra...');
                const { nftAddr } = validateInput(nftAddress, priceInTon);
                const marketplaceAddr = Address.parse(MARKETPLACE_ADDRESS);

                // OpCode para Tact 'Buy'
                const body = beginCell()
                    .storeUint(0x03ebe671, 32) 
                    .storeAddress(nftAddr)
                    .endCell();

                const payloadBoc = Buffer.from(body.toBoc()).toString('base64');
                console.log('Payload BoC (Base64):', payloadBoc);

                const transaction = {
                    validUntil: Math.floor(Date.now() / 1000) + 600, // 10 minutos
                    messages: [
                        {
                            address: marketplaceAddr.toString(), 
                            amount: (toNano(priceInTon) + toNano('0.05')).toString(), 
                            payload: payloadBoc,
                        },
                    ],
                };

                console.log('Enviando transacción a la UI de TonConnect:', transaction);
                
                try {
                    if (!tonConnectUI) {
                        throw new Error('TonConnectUI no está inicializado');
                    }
                    
                    const result = await tonConnectUI.sendTransaction(transaction);
                    console.log('¡Transacción enviada con éxito!', result);
                    return result;
                } catch (e: any) {
                    console.error('Error detallado al enviar transacción:', e);
                    if (e?.message?.includes('User rejected')) {
                        throw new Error('La transacción fue rechazada por el usuario en la wallet.');
                    }
                    throw e;
                }
            },
            
            listSkill: async (nftAddress: string, priceInTon: string) => {
                const { nftAddr } = validateInput(nftAddress, priceInTon);
                const marketplaceAddr = Address.parse(MARKETPLACE_ADDRESS);

                // OpCode real de Tact para 'ListSkill' es 3900203407 (0xe878618f)
                const body = beginCell()
                    .storeUint(3900203407, 32) 
                    .storeAddress(nftAddr)
                    .storeInt(toNano(priceInTon), 257)
                    .endCell();

                const transaction = {
                    validUntil: Math.floor(Date.now() / 1000) + 60,
                    messages: [
                        {
                            address: marketplaceAddr.toString(),
                            amount: toNano('0.05').toString(), // Fee para gas
                            payload: Buffer.from(body.toBoc()).toString('base64'),
                        },
                    ],
                };

                return await tonConnectUI.sendTransaction(transaction);
            }
        };
    }, [tonConnectUI]);
}
