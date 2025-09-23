export default function Task({title}) {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <>
        <view
        style={{marginBottom:20, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>

        <checkbox
        style={{marginRight:10}}
        value={isChecked}
        onValueChange={setIsChecked}
        />
        <text>{title}</text>
        </view>
        </>
    );
}
