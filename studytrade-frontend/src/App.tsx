import { useState } from "react";
import Shoppage from "./pages/Shoppage/Shoppage";
import Homepage from "./pages/Homepage/Homepage";
import Profilepage from "./pages/Profilepage/Profilepage";
import Menubar from "./GlobalComponents/Menubar";
import Loginpage from "./pages/Loginpage/Loginpage";
import RegisterPage from "./pages/Registerpage/Registerpage";

function App() {
    const [currentSite, setSite] = useState("Loginpage");

    const renderMenubar = () => {
        if (currentSite !== "Loginpage" && currentSite !== "Registerpage") {
            return (
                <Menubar
                    shoppageClick={() => setSite("Shoppage")}
                    homepageClick={() => setSite("Homepage")}
                    profilepageClick={() => setSite("Profilepage")}
                />
            );
        }
        return null;
    };

    return (
        <div>
            {renderMenubar()}
            {currentSite === "Homepage" && (
                <Homepage
                    shoppageClick={() => setSite("Shoppage")}
                    profilepageClick={() => setSite("Profilepage")}
                />
            )}
            {currentSite === "Shoppage" && <Shoppage />}
            {currentSite === "Profilepage" && (
                <Profilepage homepageClick={() => setSite("Homepage")} />
            )}
            {currentSite === "Loginpage" && (
                <Loginpage
                    homepageClick={() => setSite("Homepage")}
                    registerClick={() => setSite("Registerpage")}
                    onLoginSuccess={() => setSite("Shoppage")}
                />
            )}
            {currentSite === "Registerpage" && (
                <RegisterPage
                    clickBackToLogin={() => setSite("Loginpage")}
                    onRegistrationSuccess={() => setSite("Shoppage")}
                />
            )}
        </div>
    );
}

export default App;
