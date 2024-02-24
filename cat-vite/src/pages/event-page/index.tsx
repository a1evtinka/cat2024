import {
    Button,
    Checkbox,
    DatePicker,
    Form,
    Input,
    Rate,
    Select,
    Space,
  } from 'antd';
  import React from 'react';
import ProgressBar from '../../shared/other/ProgressBar';
import CreateEventCss from './createEvent.module.css'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { countries } from '../../shared/utils/countries';
import Footer from '../../shared/elements/footer';


  interface ICreateEventForm {
    email: string;
  }

  const options = countries.map((c) => ({
    value: c,
    label: c, 
  }))
  
  
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const { RangePicker } = DatePicker;
  const CreateEventPage: React.FC = () => {
    const [form] = Form.useForm();
  
    const handleSave = () => {
      console.log('Received values of form: ');
    };
  

    const saveAsDraft = () => {
        console.log('saveAsDraft');
      };


  
    return (
      <div className={CreateEventCss.container}>
      <ProgressBar percent={90} />
      <div className={CreateEventCss.yellow}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        // onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="eventTitle"
          label="Название"
        >
          <Input placeholder='Название мероприятия:' />

        </Form.Item>

        <Form.Item
          name="description"
          label="Описание"
        >
          <Input placeholder='Описание мероприятия:' />

        </Form.Item>

        <Form.Item
          name="limit"
          label="Лимит участников"
        >
          <Input type='number' />

        </Form.Item>

        <Form.Item label="Даты поездки">
          <RangePicker />
        </Form.Item>

        <Form.Item name="rate" label="Этап">
      <Rate  count={3}/>
    </Form.Item>

   
        <Form.List name="options">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              <Form.Item
                {...restField}
                name={[name, 'description']}
              >
                <Input placeholder="Описание локации" />
              </Form.Item>

              <Form.Item
                {...restField}
                name={[name, 'country']}
              >
                <Select placeholder="Выберите страну" options={options}/>
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'budget']}
              >
                <Input type="number" placeholder="Бюджет (руб.)" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Добавить вариант
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Ознакомьтесь с правилами')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            Я прочитал(-а)  <a href="">правила</a>
          </Checkbox>
        </Form.Item>
        <Footer
        onOkClick={handleSave}
        onCancelClick={saveAsDraft}
        cancelButtonName="Сохранить как черновик"
        />
      </Form>

        
      </div>
      </div>
    );
  };
  
  export default CreateEventPage;







//   return (
//     <>
//       <form onSubmit={createEvents} align="center" >
//         <div>
//           Создание Мероприятия:
//         </div>
//         <Spacer h={1} />

//         <Input placeholder='Название мероприятия:' name='eventTitle' htmlType='text' width="50%" required /><p></p>
//         <Input placeholder='Дата начала мероприятия:' name='startDate' htmlType='date' width="50%" required /><p></p>
//         <Input placeholder='Дата окончания мероприятия:' name='endDate' htmlType='date' width="50%" required /><p></p>
//         <Input placeholder='Лимит участвников:' name='maxParticipants' htmlType='number' width="50%" required /><p></p>
//         <Input placeholder='Описание мероприятия:' name='description' htmlType='text' width="50%" required /><p></p>
//         <div>
//           Опция 1: <br />
//         </div>
//         <Spacer h={1} />

//         <Input placeholder='Название локации:' name='title1' htmlType='text' width="50%" required /><p></p>
//         {photo1
//           ? <>
//             <Image width="280px" height="160px" src={`${photo1}`} alt="Какая то ошибочка упси-дупси!" />
//             </>
//           : <></>}
//         <Input placeholder='Url' name='photo1' htmlType='text' width="50%" required onChange={(e)=>setPhoto1(e.target.value)}/><p />
//         <Input placeholder='Описание локации:' name='description1' htmlType='text' width="50%" required /><p></p>
//         <Input placeholder='Минимальный бюджет:' name='budget1' htmlType='number' width="50%" required /><p></p>
//         <Select placeholder="Select country" name="country" onChange={countryHandler1} width="24.4%">
//           {countries?.map((country) => <Select.Option key={country.id} value={`${country.id}`}>{country.country}</Select.Option>)}
//         </Select>
//         <Spacer h={1} />
//         <div>
//           Опция 2: <br />
//         </div>
//         <Spacer h={1} />
//         <Input placeholder='Название локации:' name='title2' htmlType='text' width="50%" required /><p></p>
//         {photo2
//           ? <>
//             <Image width="280px" height="160px" src={`${photo2}`} alt="Какая то ошибочка упси-дупси!" /><p></p>
//           </>
//           : <></>}
//         <Input placeholder='Url' name='photo2' htmlType='text' width="50%" required onChange={(e)=>setPhoto2(e.target.value)} /><p></p>
//         <Input placeholder='Описание локации:' name='description2' htmlType='text' width="50%" required /><p></p>
//         <Input placeholder='Минимальный бюджет:' name='budget2' htmlType='number' width="50%" required /><p></p>
//         <Select placeholder="Select country" name="country" onChange={countryHandler2} width="24.4%">
//           {countries?.map((country) => <Select.Option key={country.id} value={`${country.id}`}>{country.country}</Select.Option>)}
//         </Select>
//         <Spacer h={1} />
//         <div>
//           Опция 3: <br />
//         </div>
//         <Spacer h={1} />
//         <Input placeholder='Название локации:' name='title3' htmlType='text' width="50%" required /><p></p>
//         {photo3
//           ? <>
//             <Image width="280px" height="160px" src={`${photo3}`} alt="Какая то ошибочка упси-дупси!" /><p></p>
//           </>
//           : <></>}
//         <Input placeholder='Url' name='photo3' htmlType='text' width="50%" required onChange={(e)=>setPhoto3(e.target.value)} /><p></p>
//         <Input placeholder='Описание локации:' name='description3' htmlType='text' width="50%" required /><p></p>
//         <Input placeholder='Минимальный бюджет:' name='budget3' htmlType='number' width="50%" required /><p></p>
//         <Select placeholder="Select country" name="country" onChange={countryHandler3} width="24.4%">
//           {countries?.map((country) => <Select.Option key={country.id} value={`${country.id}`}>{country.country}</Select.Option>)}
//         </Select><p></p>
//         <br />
//         <Button htmlType='submit' width="25%"> Создать</Button>
//       </form>
//     </>
//     // {/* <ImageCropper> // нужно ли при загрузке изображения создавать картинку 
//     // того что загрузили вот этот кусок кода для этого с созданием возможных стейтов
//     //     <StyledImage src={'https://independentmuseums.ru/upload/shop_3/8/8/9/item_889/item_889.jpg'}></StyledImage>
//     //   </ImageCropper> */}
//   );
// }

// export default EventForm;
