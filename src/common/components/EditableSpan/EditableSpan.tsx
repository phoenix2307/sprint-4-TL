import { ChangeEvent, useState } from "react"
import TextField from "@mui/material/TextField"

type Props = {
  value: string
  onChange: (newTitle: string) => void
  disabled?: boolean
}

export const EditableSpan = ({ value, onChange, disabled }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(value)

  const activateEditModeHandler = () => {
    setEditMode(true)
  }

  const deactivateEditModeHandler = () => {
    setEditMode(false)
    onChange(title)
  }

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  return (
    <>
      {editMode ? (
        <TextField
          variant={"outlined"}
          value={title}
          size={"small"}
          onChange={changeTitleHandler}
          onBlur={deactivateEditModeHandler}
          autoFocus
          disabled={disabled}
        />
      ) : (
        <span onDoubleClick={activateEditModeHandler}>{value}</span>
      )}
    </>
  )
}
