import React, { ReactHTMLElement } from 'react'
import './index.css'
import { Button } from 'antd';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  okButtonName?: string;
  cancelButtonName?: string;
  onOkClick: () => void;
  onCancelClick: () => void;
}

export default function Footer({ 
    okButtonName = 'Сохранить', 
    cancelButtonName = "Отмена", 
    onOkClick, 
    onCancelClick}: Props) {
  return (
    <div className='footer'>
        <Button type="primary" htmlType="submit" onClick={onOkClick}>
          {okButtonName}
        </Button>
        <Button type="default" htmlType="submit" onClick={onCancelClick}>
          {cancelButtonName}
        </Button>
    </div>
  )
}
