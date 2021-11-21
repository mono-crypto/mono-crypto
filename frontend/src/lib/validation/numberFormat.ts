const formatType = {
    number: "number",
    date: "date"
} as const;

export type formatType = typeof formatType[keyof typeof formatType]

export default function numberFormat(data: string|number, type:formatType) {
    let valueToString = typeof data === "number" ? data.toString() : data
    let valueToInt = 0;

    if(type === 'number') {
        valueToInt = parseInt(valueToString.replace(/[^\d]+/g, ''), 10)
        if(isNaN(valueToInt)) {
            valueToInt = 0
        }
        return valueToInt.toLocaleString()
    } else {
        return valueToString;
    }
}