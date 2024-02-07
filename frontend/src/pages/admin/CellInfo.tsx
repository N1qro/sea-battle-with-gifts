import { useOutletContext } from "react-router-dom"
import { OutletContextType } from "./Game"
import { Header4, Header5, SubText } from "../../styles/TextStyles"
import StyledForm, { FieldWrapper, FormError } from "../../styles/StyledForm"
import Input, { TextArea } from "../../styles/InputElement"
import { CellInfoContainer } from "../../styles/CellInfo"
import Button from "../../components/Button"
import { useEffect, useState, ChangeEvent } from "react"
import { CellObject } from "../../types/responses"
import delete_prize from "../../api/deleteprize"
import create_prize from "../../api/createprize"
import change_prize from "../../api/changeprize"
import Editor, { ContentEditableEvent } from "react-simple-wysiwyg"


function CellInfo() {
    const { selectedCell, gameData, refetchData } = useOutletContext<OutletContextType>()
    const [ cellObject, setCellObject ] = useState<CellObject | null>()
    const [ error, setError ] = useState("")
    const [ formData, setFormData ] = useState<{
        text: string,
        title: string,
        activation_code: string,
        image: File | null,
    }>({
        text: "",
        title: "",
        activation_code: "",
        image: null,
    })

    function editorEdit(e: ContentEditableEvent) {
        setFormData(prev => ({...prev, text: e.target.value}))
    }

	function handleTextInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData(prev => ({...prev, [e.target.id]: e.target.value}))
    }

    function handleFileInput(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setFormData(prev => ({...prev, "image": e.target.files![0]}))
        }
    }

    function changePrize(e) {
        (async () => {
            const data = await change_prize(cellObject?.ship.prize?.id, {...formData, game: gameData.link })
            if (data.status === "error") {
                setError(data.content)
            } else {
                refetchData()
            }
        })()
        e.preventDefault()
    }

    function addPrize(e) {
        (async () => {
            const data = await create_prize({...formData, game: gameData.link, cell: {position: selectedCell}})
            if (data.status === "error") {
                setError(data.content)
            } else {
                setError("")
                refetchData()
            }
        })()
        e.preventDefault()
    }

    function deletePrize(e, id, gameLink) {
        (async () => {
            const data = await delete_prize(id, gameLink)
            if (data.status === "error") {
                setError(data.content)
            } else {
                refetchData()
            } 
        })()
        e.preventDefault()
    }

    useEffect(() => {
        const cell = gameData.cells?.filter(val => val.position === selectedCell)[0]
        setCellObject(cell || null)
        setError("")
        setFormData({
            text: cell?.ship.prize?.text || "",
            title: cell?.ship.prize?.title || "",
            activation_code: cell?.ship.prize?.activation_code || "",
            image: cell?.ship.prize?.image || null,
        })
    }, [gameData, selectedCell])

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
                            disabled={gameData.status !== 0}
                            onChange={handleTextInput}
                            value={formData.title}
                            placeholder="Подарочная карта на 1000Р"
                        ></Input>
                        <FormError>{error.title}</FormError>
                    </div>
                    <div>
                        <label htmlFor="">Описание</label>
                        <br />
                        <Editor
                            disabled={gameData.status !== 0}
                            value={formData.text}
                            onChange={editorEdit}
                            id="text"
                            name="text"
                        />
                        <FormError>{error.text}</FormError>
                    </div>
                    <div>
                        <label htmlFor="">Содержимое</label>
                        <br />
                        <Input
                            id="activation_code"
                            onChange={handleTextInput}
                            value={formData.activation_code}
                            disabled={gameData.status !== 0}
                            placeholder="Ссылка или код"
                        ></Input>
                        <FormError>{error.activation_code}</FormError>
                        <FormError>{error.details}</FormError>
                    </div>
                    <div>
                        <label htmlFor="">Изображение</label>
                        <br />
                        <Input
                            disabled={gameData.status !== 0}
                            type="file"
                            onChange={handleFileInput}
                        ></Input>
                    </div>
                    {!cellObject && <Button
                        disabled={gameData.status !== 0}
                        $color="green"
                        onClick={addPrize}
                    >Добавить приз</Button>}
                    {cellObject && <Button
                        disabled={gameData.status !== 0}
                        $color="red"
                        onClick={e => changePrize(e, cellObject.ship.prize.id, gameData.link)}
                    >Изменить приз</Button>}
                    {cellObject && <Button
                        disabled={gameData.status !== 0}
                        $color="red"
                        onClick={e => deletePrize(e, cellObject.ship.prize.id, gameData.link)}
                    >Удалить приз</Button>}
                </FieldWrapper>
            </StyledForm>
            {gameData.status !== 0 && <FormError>Редактирование запрещено, игра опубликована или уже завершена</FormError>}
        </CellInfoContainer>
    )
}

export default CellInfo