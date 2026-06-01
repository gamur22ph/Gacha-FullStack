import githubIcon from '../assets/socials/github-icon.webp';
import linkedInIcon from '../assets/socials/linkedin.svg';
import itchIoIcon from '../assets/socials/itchio-icon.svg';

const Footer = () => {
    return (
        <>
            <div className="bg-green-950 w-full h-50 p-4 text-white text-xl flex flex-col">
                
                <div className="h-2/3">

                </div>

                <div className="h-1/3 flex items-center">
                    <div className="w-full flex justify-center">
                        <p className="text-green-100 text-sm">© 2026 Gachapp.</p>
                    </div>
                    <div className="w-full flex justify-center gap-2">
                        <a href='https://github.com/gamur22ph'>
                            <img src={githubIcon} height={36} width={36} className="text-green-100 text-md hover:scale-110 transition-all"/>
                        </a>
                        <a href='https://www.linkedin.com/in/julius-rino-encabo'>
                            <img src={linkedInIcon} height={36} width={36} className="text-green-100 text-md hover:scale-110 transition-all"/>
                        </a>
                        <a href='https://cipherlius.itch.io/'>
                            <img src={itchIoIcon} height={36} width={36} className="text-green-100 text-md hover:scale-110 transition-all"/>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;