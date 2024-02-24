import React, { ReactHTMLElement } from 'react'
import FooterCss from './footer.module.css'
import { Button } from 'antd';
import { FormInstance } from 'antd/lib';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  okButtonName?: string;
  cancelButtonName?: string;
  formId?: string;
  onOkClick?: () => void;
  onCancelClick: () => void;
}

export default function Footer({ 
    okButtonName = 'Сохранить', 
    cancelButtonName = "Отмена", 
    formId,
    onOkClick, 
    onCancelClick}: Props) {
  return (
    <div className={FooterCss.footer}>
        <Button type="primary" 
          htmlType={formId ? "submit" : 'button'}
          key='submit' 
          onClick={formId ? undefined : onOkClick}
          form={formId || ''}>
          {okButtonName}
        </Button>
        <Button type="default" onClick={onCancelClick}>
          {cancelButtonName}
        </Button>
    </div>
  )
}
