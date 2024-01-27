import { useOutletContext } from "react-router-dom"
import { OutletContextType } from "./Game"
import { Header4, SubText } from "../../styles/TextStyles"
import StyledForm, { FieldWrapper } from "../../styles/StyledForm"
import Input, { TextArea } from "../../styles/InputElement"
import { CellInfoContainer } from "../../styles/CellInfo"
import Button from "../../components/Button"
import { useEffect, useState, ChangeEvent } from "react"
import { CellObject } from "../../types/responses"
import delete_prize from "../../api/deleteprize"
import create_prize from "../../api/createprize"


function CellInfo() {
    const { selectedCell, gameData } = useOutletContext<OutletContextType>()
    const [ cellObject, setCellObject ] = useState<CellObject | null>()
    const [ formData, setFormData ] = useState({
        text: "",
        title: "",
        activation_code: "",
    })

	function handleTextInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData(prev => ({...prev, [e.target.id]: e.target.value}))
    }

    function addPrize(e) {
        (async () => {
            const data = await create_prize({...formData, game: gameData.link, cell: {position: selectedCell}})
            console.log("created?")
            console.log(data)
        })()
        e.preventDefault()
    }

    function deletePrize(e, id, gameLink) {
        (async () => {
            const data = await delete_prize(id, gameLink)
            console.log("Deleted")
            console.log(data)
        })()
        e.preventDefault()
    }

    useEffect(() => {
        const cell = gameData.cells?.filter(val => val.position === selectedCell)[0]
        setCellObject(cell || null)
        setFormData({
            text: cell?.ship.prize?.text || "",
            title: cell?.ship.prize?.title || "",
            activation_code: cell?.ship.prize?.activation_code || "",
        })
    }, [gameData, selectedCell])

    console.log(cellObject)

    return (
        <CellInfoContainer>
            <Header4>Информация о клетке {selectedCell}</Header4>
            <SubText>Статус: {cellObject ? cellObject.status : "Не занята"}</SubText>
            <StyledForm>
                <FieldWrapper>
                    <div>
                        <label htmlFor="">Название приза</label>
                        <br />
                        <Input
                            id="title"
                            onChange={handleTextInput}
                            value={formData.title}
                            placeholder="Подарочная карта на 1000Р"
                        ></Input>
                    </div>
                    <div>
                        <label htmlFor="">Описание</label>
                        <br />
                        <TextArea onChange={handleTextInput} value={formData.text} name="description" id="text"></TextArea>
                    </div>
                    <div>
                        <label htmlFor="">Содержимое</label>
                        <br />
                        <Input
                            id="activation_code"
                            onChange={handleTextInput}
                            value={formData.activation_code}
                            placeholder="Ссылка или код"
                        ></Input>
                    </div>
                    {/* <div>
                        <label htmlFor="">Изображение</label>
                        <br />
                        <Input
                            type="file"
                        ></Input>
                    </div> */}
                    {!cellObject && <Button
                        $color="green"
                        onClick={addPrize}
                    >Добавить приз</Button>}
                    {cellObject && <Button
                        $color="red"
                        onClick={e => deletePrize(e, cellObject.ship.prize.id, gameData.link)}
                    >Удалить приз</Button>}
                </FieldWrapper>
            </StyledForm>
        </CellInfoContainer>
    )
}

export default CellInfo