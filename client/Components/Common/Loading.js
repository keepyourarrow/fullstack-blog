import { BoxLoading } from "react-loadingg";

const Loading = () => {
    return (
        <div
            className="relative loading-container"
            style={{
                margin: "25px 0 35px 0",
                width: "100%",
            }}
        >
            <br />
            <BoxLoading color="#ea4cb9" style={{ position: "absolute", inset: "0px" }} />
        </div>
    );
};

export default Loading;
