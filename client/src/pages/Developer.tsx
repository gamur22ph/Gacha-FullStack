import GameShowcase from "../components/GameShowcase"
import githubIcon from "../../public/images/socials/github-icon.webp"
import linkedInIcon from "../../public/images/socials/linkedin.png"
import itchIoIcon from "../../public/images/socials/itchio-icon.svg"
import resumeIcon from "../../public/images/dev/profile.svg";
import portfoliosIcon from "../../public/images/dev/project-portfolio.png";

function Developer() {

    return(
        <>
        <div className="w-full flex flex-col items-center justify-center bg-[#121212]">
            <div className="h-[5vh]" id="resume">
                
            </div>
            {/* Quick Navigation */}
            <div className="fixed top-18 left-0 bg-gray-600 p-1.5 rounded-2xl opacity-65 z-49 flex flex-col gap-y-2">
                <a href="#resume" className="h-8 md:h-12">
                    <img src={resumeIcon} className="h-8 md:h-12 hover:scale-110 transition-transform"/><br/>
                </a>
                <a href="#projects" className="h-8 md:h-12">
                    <img src={portfoliosIcon} className="h-8 md:h-12 hover:scale-110 transition-transform"/><br/>
                </a>
            </div>
            {/* CV Profile */}
            <div className="w-9/10 md:w-3/4 mx-auto my-6 overflow-hidden border bg-[#1A1A1A] border-slate-200 shadow-sm shadow-white">
                <div className="flex flex-row w-full p-5">
                    <div className="w-1/2 text-green-600">
                        <p className="text-2xl md:text-5xl "><b>Julius Encabo</b></p>
                        <p className="text-xs">Dasmariñas City, Cavite, Philippines | (+63) 9087056549 | juliusencabo00@gmail.com</p><br/>
                        <p className="text-xl text-nowrap">Software Developer</p>
                        
                    </div>
                    <div className="w-1/2 text-green-600">
                        <div className="w-full flex justify-end">
                            <div className="p-2 rounded bg-white opacity-80">
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
                    </div>
                    
                </div>
                {/* SUMMARY */}
                <div className="flex w-full p-2 md:p-5">
                    <div className="block bg-[#121212] h-full w-full p-2 md:p-5">
                        <p className="text-2xl text-white"><b>Summary</b></p>
                        <br/>
                        <hr className="text-green-600"/>
                        <p className="mt-5 text-center md:text-left text-white bg-gray-800 p-4">
                            Adaptive and results-driven Software Programmer specializing in game development, logic systems, and 
structured problem-solving. Proven track record in the full game development lifecycle, including coding 
UI/UX, implementing APIs, and successfully publishing a title on Steam. Strong background in software 
troubleshooting, quality assurance, and cross-functional team collaboration. Efficient self-manager who 
rapidly masters new technologies and frameworks.
                        </p>
                    </div>
                </div>
                {/* WORK EXPERIENCE */}
                <div className="flex w-full p-2 md:p-5 pt-1">
                    <div className="block bg-[#121212] h-full w-full p-2 md:p-5 text-white">
                        <p className="text-2xl"><b>Work Experience</b></p>
                        <br/>
                        <hr className="text-green-600"/>
                        <p className="mt-5 max-w-full bg-gray-800 p-2">
                            <b>07/2024 - 10/2025 <br/>Unity Lead Programmer</b><br/>
                            <pre className="text-xs md:text-base">Metavurx Studios – Sta. Rosa, Laguna </pre> 
                            <hr/>
                            <div className="flex w-full justify-center">
                                <p className="md:h-full break-keep text-sm md:text-base w-full md:w-9/10">
                                    • Worked on game logic, core system architecture, and UI/UX implementation utilizing the Unity Engine.<br/>
                                    • Integrated external APIs and plugins to extend game functionalities and optimize performance. <br/>
                                    • Collaborated closely with cross-functional development teams to align project design, timelines, and technical requirements. <br/>
                                    • Diagnosed complex technical issues, executed debugging processes, and presented solutions to producers and stakeholders. <br/>
                                    • Successfully developed, finalized, and published a commercial game title on Steam. 
                                </p>
                            </div>
                        </p>
                        <div className="mt-5 max-w-full bg-gray-800 p-2">
                            <b>02/2023 - 04/2023 <br/>Game Programmer Intern </b><br/>
                            <pre className="text-xs md:text-base">Irvine Environmental Inc. </pre>
                            <hr/>
                            <div className="flex w-full justify-center">
                                <p className="break-keep text-sm md:text-base w-full md:w-9/10">
                                    • Designed and presented a game design to the stakeholders.<br/>
                                    • Collaborated with a game development team to incorporate and tailor the game to the company’s vision.<br/> 
                                    • Coded a small game using the Unity engine.<br/>
                                    • Developed and presented the game to the executives.
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 max-w-full bg-gray-800 p-2">
                            <b>08/2022 - 09/2022 <br/>Quality Assurance Intern </b><br/>
                            <pre className="text-xs md:text-base">Purple Bug Inc. – Makati City </pre> 
                            <hr/>
                            <div className="flex w-full justify-center">
                                <p className="break-keep text-sm md:text-base w-full md:w-9/10">
                                    • Collaborated with a web development team to understand the structure of the websites to be tested.<br/>   
                                    • Tested, observed, and maintained websites to identify problems and check edge cases.<br/>
                                    • Used an admin account on websites to add, edit, and remove data from the websites that require testing.<br/>
                                    • Listed and labelled bugs for the developers to fix.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* SKILLS */}
                <div className="flex w-full p-2 md:p-5 pt-1">
                    <div className={`block bg-[#121212] h-full w-full p-2 md:p-5`}>
                        <p className="text-2xl text-white"><b>Skills</b></p>
                        <br/>
                        <hr className="text-green-600"/>
                        <br/>
                        <div className="flex flex-col md:flex-row w-full bg-gray-800 p-4 gap-x-4 text-white">
                            <div>
                                <p>
                                    • Game Development<br/>
                                    • Software Programming<br/>
                                    • Unity Engine<br/>
                                    • API Integration<br/>
                                    • Plugin Implementation
                                </p>
                            </div>
                            <div>
                                <p>
                                    • Creative Project Execution<br/>
                                    • UI/UX Fundamentals<br/>
                                    • Game Design Collaboration<br/>
                                </p>
                            </div>
                        </div>    
                    </div>
                </div>
                {/* LANGUAGE AND TECHSTACK */}
                <div className="flex w-full p-2 md:p-5 pt-1">
                    <div className={`block bg-[#121212] h-full w-full p-2 md:p-5`}>
                        <p className="text-2xl text-white"><b>Languages & Tech Stacks</b></p>
                        <br/>
                        <hr className="text-green-600"/>
                        <br/>
                        <div className="flex flex-col md:flex-row w-full bg-gray-800 p-4 gap-x-4 text-white">
                            <div>
                                <p>
                                    • C# Unity<br/>
                                    • HTML, CSS, JS/TS<br/>
                                    • Python<br/>
                                    • GD Script<br/>
                                    • Express/React/Node 
                                </p>
                            </div>
                            <div id="projects">
                                <p>
                                    • NoSQL(MongoDB) <br/>
                                    • SQL(Postgres) <br/>
                                    • RESTAPI<br/>
                                </p>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
            {/* Portfolio and Projects */}
            <div className="w-full h-full bg-black p-4 font-pixel">
                <h2 className="text-white text-4xl text-center w-full">Game Development</h2>
                <hr className="text-white"/>
                <div className="p-4">
                    <p className="text-white text-2xl text-center w-full">Personal Projects</p>
                    <div className="w-full flex justify-center">
                        <a href="https://cipherlius.itch.io/">
                            <img src="https://img.icons8.com/ios11/600/FA5252/itch-io.png" height={32} width={32}/>
                        </a>
                    </div>
                    <GameShowcase/>
                </div>
                
                <hr className="text-white"/>
                <p className="text-white text-2xl text-center w-full pt-4">Professional Games</p>
                <div className="w-full h-full flex justify-center font-pixel-low p-2 md:p-4">
                    <div className="w-9/10 md:w-3/4 flex flex-col md:flex-row">
                        <div className="w-full">
                            <div className="w-full">
                                <img 
                                    src="https://thegamingoutsider.com/wp-content/uploads/2025/05/Tri_Survive_Feature-scaled.png" 
                                    alt="Tri Survive" 
                                    className="w-full h-full object-cover transition-all duration-500"
                                />
                                <a href="https://store.steampowered.com/app/3072970/Tri_Survive/" target="_blank" rel="noopener" className="block w-full bg-blue-600 hover:bg-blue-700 p-2 text-white text-center">
                                    View Store Page
                                </a>
                            </div>
                        </div>
                        
                        <div className="w-full text-white p-2 md:p-4 text-lg">
                            <span className="text-yellow-500">TriSurvive </span>- A roguelite fantasy game by <span className="text-blue-600">Majestic Mind Games</span>, controlling 3 characters in a triangle.<br/><span className="text-green-500">Engine:</span> Unity<br/><br/>
                            Lead Programmer(co-developed)
                            <br/><br/>
                            <p className="text-xl"><b>Technical Experience:</b></p>
                            <ul>
                                <li>- <span className="text-green-500">Map Generation:</span> 9-tile random generation, intentional decoration placements</li>
                                <li>- <span className="text-green-500">Shaders:</span> Water, Foliage, HUD & more</li>
                                <li>- <span className="text-green-500">Characters:</span> 9 with unique abilities</li>
                                <li>- <span className="text-green-500">Enemies:</span> Over 20 with mostly unique abilities and behaviors</li>
                                <li>- <span className="text-green-500">Wave System:</span> Rich wave system with multiple options of how you want it to work. Also, designer friendly for tweaking.</li>
                                <li>- <span className="text-green-500">Progression System:</span> dialogues, unlockables, save system</li>
                                <li>- <span className="text-green-500">Steam API:</span> Achievements</li>
                                <li>- <span className="text-green-500">Upgrade System:</span> Random Upgrade Selection with probability weights and Shop Items</li>
                                <li>- <span className="text-green-500">Localization:</span> Supported over 5 languages.</li>
                            </ul>
                            
                        </div>
                    </div>
                </div>
                <br/><br/>
                <div className="w-full h-full flex justify-center font-pixel-low p-2 md:p-4">
                    <div className="w-9/10 md:w-3/4 flex flex-col md:flex-row">
                        <div className="w-full">
                            <div className="w-full">
                                <img 
                                    src="https://metavurxstudios.com/wp-content/uploads/2025/08/Lava-Survival-Wallpaper-Featured-Image_Revision-1-copy-scaled.jpg" 
                                    alt="Lava Survival" 
                                    className="w-full h-full object-cover transition-all duration-500"
                                />
                                <a href="https://play.google.com/store/apps/details?id=com.gamelegendstudio.lavasurvival&hl=en" target="_blank" rel="noopener" className="block w-full bg-green-600 hover:bg-green-700 p-2 text-white text-center">
                                    View in Google Play Store
                                </a>
                                <a href="https://apps.apple.com/sa/app/lava-survival/id6748965384" target="_blank" rel="noopener" className="block w-full bg-slate-600 hover:bg-slate-700 p-2 text-white text-center">
                                    View in App Store
                                </a>
                            </div>
                        </div>
                        <div className="w-full text-white p-2 md:9p-4 text-lg">
                            <span className="text-yellow-500">Lava Survival </span>- A 4x strategy mobile game by <span className="text-blue-600">Game Legends</span>.<br/><span className="text-green-500">Engine:</span> Unity<br/><br/>
                            Gameplay & UI Programmer
                            <br/><br/>
                            <p className="text-xl"><b>Technical Experience:</b></p>
                            <ul>
                                <li>- <span className="text-green-500">UI:</span> Over 9 Complex UI pages with functionalities</li>
                                <li>- <span className="text-green-500">UI Implementation:</span> Implemented UI presented by our UI Designer and is supported on multiple resolutions</li>
                                <li>- <span className="text-green-500">API Integration:</span> Used API from our Backend API Developer</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <br/>
                
                
                {/* <div className="w-3/4 flex justify-center mx-auto">
                    <div className="grid grid-cols-5 gap-4">
                        <button className="hover:scale-105 transition-all">
                            <img src="" height={200} width={200}/>
                        </button>
                        <button className="hover:scale-105 transition-all">
                            <img src="" height={200} width={200}/>
                        </button>
                        <button className="hover:scale-105 transition-all">
                            <img src="" height={200} width={200}/>
                        </button>
                        <button className="hover:scale-105 transition-all">
                            <img src="" height={200} width={200}/>
                        </button>
                        <button className="hover:scale-105 transition-all">
                            <img src="" height={200} width={200}/>
                        </button>
                        <button className="hover:scale-105 transition-all">
                            <img src="" height={200} width={200}/>
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
            
        </>
    )
}

export default Developer;