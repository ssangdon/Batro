const InputText = (props) => {
    return <input {...props} type="text" style={{
        color: "#C8C8C8",
        fontWeight: 600,
        fontSize: 16,
        lineHeight: 24,
        height: 40,
        borderRadius: 8,
        border: "1px solid #C8C8C8",
        width: "100%",
        padding: "4px 12px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    }} />   
}
export default InputText;