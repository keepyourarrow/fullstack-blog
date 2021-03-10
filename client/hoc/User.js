function User({ children }) {
    console.log({ session, loading });

    let test = "test test";

    const getTest = () => {
        console.log(test);
    };

    return children;
}

export default User;
