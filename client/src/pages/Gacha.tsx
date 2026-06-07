import { useState } from 'react';
import nightBackground from '../assets/images/night-background.jpg';
import type { GachaModalType } from '../props/GachaModalProps';
import GachaModal from '../components/GachaModal';
import { gachaPull } from '../services/GachaServices';
import { useAuth } from '../contexts/AuthContext';
import { ENV } from '../helpers/EnvUtils';

const Gacha = () => {
    const [activeModalType, setActiveModalType] = useState<GachaModalType>(null);
    const [message, setMessage] = useState('');
    const [pulledItems, setPulledItems] = useState<string[]>([]);
    const { user, updateUser, token } = useAuth();
    const [isClaiming, setIsClaiming] = useState(false);

    const handlePull = async (pullCount : number) => {
        if (!token) {
            setMessage("No token.");
            setActiveModalType('error');
            return;
        }

        try{
            const response = await gachaPull(token, pullCount);

            const data = await response.json();

            if(response.status === 402){
                setMessage(data.message);
                setActiveModalType('error');
                return;
            }

            updateUser({
                pull_currency: data.updatedCurrency,
                star_5_pity: data.star_5_pity,
                star_4_pity: data.star_4_pity
            });

            const itemsPulled : [{itemId : string}] = data.itemsPulled;
            for (let i = 0; i < itemsPulled.length; i++) {
                const { itemId } = itemsPulled[i];
                setPulledItems((itemList) => [...itemList, itemId]);
            }
            console.log(pulledItems);
            setActiveModalType('pull');
        }catch(err : any){
            console.log(err.message);
        }
    }

    const convertFragments = async () => {
        if (user === null) return; 

        try{
            if (user.pull_currency_fragment < 20){
                setActiveModalType('error');
                setMessage('Not enough fragments to convert.');
                return;
            }

            const response = await fetch(`${ENV.API_URL}/api/users/convert-fragments`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            const data = await response.json();

            updateUser({
                pull_currency: data.pull_currency,
                pull_currency_fragment: data.pull_currency_fragment
            })

            console.log(data.message);
        }
        catch (err: any)
        {
            console.error(err.message);
        }
    }

    const claimDaily = async () => {
        setIsClaiming(true);
        try{
            const response = await fetch(`${ENV.API_URL}/api/items/daily-claim`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            if (!response.ok){
                setIsClaiming(false);
                return;
            }

            const data = await response.json();

            updateUser({
                pull_currency: data.pull_currency,
                claim_date: data.daily_claim_date
            })

            setIsClaiming(false);
        }
        catch (err: any){
            setIsClaiming(false);
        }
    }

    return (
        <>
            <div className="fixed inset-0 -z-50 bg-cover bg-center" style={{ backgroundImage: `url(${nightBackground})`}}/>
            <div className="flex flex-col p-10 h-full">
                <div className="w-full flex justify-center md:justify-end gap-4 p-4">
                    <div className='p-3 bg-amber-100 rounded'>
                        <p>Fragment: { user?.pull_currency_fragment || 0 }/20</p>
                        <button onClick={convertFragments} className='relative w-20 bg-green-400 rounded transition-colors hover:bg-green-500'>
                            Convert
                        </button>
                    </div>
                    <div className='p-3 bg-amber-200 rounded'>
                        <p>Currency: { user?.pull_currency || 0 }</p>
                        <button disabled={(() => {
                            if (isClaiming) return true;
                            if (user && user.claim_date > Date.now()) return true;
                            return false;
                        })()} onClick={claimDaily} className='relative w-20 bg-green-400 rounded transition-colors hover:bg-green-500'>
                            {(() => {
                                if (isClaiming) return <>Claiming...</>;
                                if (user && user.claim_date > Date.now()) return <>Claimed</>;
                                return <>Claim</>;
                            })()}
                        </button>
                    </div>
                </div>
                <div className="flex grow min-h-[48vh] text-white text-right p-4">
                    <div className="w-full flex justify-end items-end">
                        <p>
                            <b>{user ? 50 - user.star_5_pity : ""}</b> pulls left to guarantee <span className='text-amber-500'><b>5-Star</b></span> item.<br/>
                            <b>{user ? 10 - user.star_4_pity : ""}</b> pulls left to guarantee <span className='text-purple-500'><b>4-Star</b></span> item.
                        </p>
                    </div>
                    
                </div>
                <div className="w-full flex justify-around text-sm md:text-md">
                    <div className="w-full flex flex-col md:flex-row gap-4">
                        <button disabled={activeModalType !== null} onClick={() => setActiveModalType('pull history')} className="p-3 pl-5 pr-5 bg-amber-50 rounded transition-colors hover:bg-amber-200">
                            Pull History
                        </button>
                        <button disabled={activeModalType !== null} onClick={() => setActiveModalType('rates')} className="p-3 pl-5 pr-5 bg-amber-50 rounded transition-colors hover:bg-amber-200">
                            Rates
                        </button>
                    </div>
                    <div className='w-1/4 md:w-full'></div>
                    <div className='w-1/4 md:w-full'></div>
                    <div className="w-full flex flex-col md:flex-row justify-end gap-4">
                        <button disabled={activeModalType !== null} onClick={() =>{handlePull(1)}} className="p-3 pl-5 pr-5 bg-amber-50 rounded transition-colors hover:bg-amber-200">
                            Pull x1
                        </button>
                        <button disabled={activeModalType !== null} onClick={() =>{handlePull(10)}} className="p-3 pl-5 pr-5 bg-amber-50 rounded transition-colors hover:bg-amber-200">
                            Pull x10
                        </button>
                    </div>
                </div>
            </div>
            <GachaModal
                modalType={activeModalType}
                extMessage={message}
                onClose={() => {
                    setActiveModalType(null)
                    setPulledItems([]);
                }}
                items={pulledItems}
            />
            
        </>
    )
}

export default Gacha;