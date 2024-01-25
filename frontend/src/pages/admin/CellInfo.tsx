import { useOutletContext } from "react-router-dom"
import { OutletContextType } from "./Game"
import { Header4, SubText } from "../../styles/TextStyles"
import StyledForm, { FieldWrapper } from "../../styles/StyledForm"
import Input, { TextArea } from "../../styles/InputElement"
import { CellInfoContainer } from "../../styles/CellInfo"
import Button from "../../components/Button"
import { useEffect, useState } from "react"
import { CellObject } from "../../types/responses"

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function convertToXY(cell: string) {
    const yPos = alphabet.indexOf(cell.charAt(0))
    const xPos = parseInt(cell.slice(1))
    return [ xPos, yPos ]
}

function CellInfo() {
    const { selectedCell, gameData } = useOutletContext<OutletContextType>()
    const [ cellObject, setCellObject ] = useState<CellObject | null>()
    const [ x, y ] = convertToXY(selectedCell)

    useEffect(() => {
        const cell = gameData.cells?.filter(val => val.x === x && val.y === y)[0]
        setCellObject(cell || null)
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
                            placeholder="Подарочная карта на 1000Р"
                        ></Input>
                    </div>
                    <div>
                        <label htmlFor="">Описание</label>
                        <br />
                        <TextArea name="description" id=""></TextArea>
                    </div>
                    <div>
                        <label htmlFor="">Содержимое</label>
                        <br />
                        <Input
                            placeholder="Ссылка или код"
                        ></Input>
                    </div>
                    <Button $color="green">Добавить приз</Button>
                    <Button $color="red">Удалить приз</Button>
                </FieldWrapper>
            </StyledForm>
        </CellInfoContainer>
    )
}

export default CellInfo