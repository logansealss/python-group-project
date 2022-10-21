

export default function ColorDropdown({color, setColor}){

    return (<>
        <div id='modal_select_input_color_label'>Please select a tag color</div>
        <div id='input-color-container'>
            <div id='input-color-test-div' style={{ backgroundColor: color }}>

            </div>
            <select
                id="modal_select_input_color"
                onChange={e => setColor(e.target.value)}
                value={color}
            >
                <option value="#006400">Green</option>
                <option value="#FF5733">Orange</option>
                <option value="#D433FF">Pink</option>
                <option value="#B84A47">Red</option>
                <option value="#FFBF00">Yellow</option>
                <option value="#0047AB">Blue</option>
                <option value="#800080">Purple</option>
                <option value="#353935">Black</option>
            </select>
        </div>
    </>)
}