import React, { useEffect, useRef, useState } from 'react';

import { DiffOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Badge,
  Button, Divider, Input, InputRef, Result, Row, Space, Typography, message,
} from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { ColumnsType } from 'antd/es/table';
import { useDispatch } from 'react-redux';
import Split from 'react-split';

import { useAppSelector } from 'app/model/store';

import AddMixBase from 'features/cppModels/addMixBase';
import { useGetCppMixComponentsQuery, useGetMixBasesSimpleListQuery, useLazyGetMixBaseByIdQuery } from 'features/cppModels/cppModelsApiSlice';
import { setCurrentElement, setCurrentElementId } from 'features/cppModels/cppModelsSlice';
import { DeleteMixBase } from 'features/cppModels/deleteMixBase';

import { ElementEntity, MixBaseEntity, SimpleEntity } from 'entities/cppModels/model';

import getNextNumber from 'shared/lib/helpers/getNextNumber';
import { SCIENTIFIC_NOTATION_NUMBER } from 'shared/lib/validators/regex';
import { AddButton } from 'shared/ui/components/buttons/AddButton';
import { DeleteButton } from 'shared/ui/components/buttons/DeleteButton';
import FormItemTemplate from 'shared/ui/components/forms/FormItemTemplate';
import FormTemplate from 'shared/ui/components/forms/FormTemplate';
import BoldText from 'shared/ui/components/headers/BoldText';
import InputSelectTemplate from 'shared/ui/components/inputs/InputSelectTemplate';
import ResizableTable from 'shared/ui/components/tables/ResizableTable';
import TableRowTemplate, { TableRowProps } from 'shared/ui/components/tables/TableRowTemplate';
import TableWithScroll from 'shared/ui/components/tables/TableWithScroll';

import './index.css';

function TableRow({ children, ...props }: TableRowProps) {
  const currentElementId = useAppSelector((state) => state.cppModels.currentElementId);
  const record = (children as React.ReactElement[])[0]?.props?.record;
  const selected = record?.id === currentElementId && currentElementId;
  let className = '';

  if (record?.id) {
    className = `${selected ? 'selected-row' : ''}`;
  }

  return (
    <TableRowTemplate
      {...props}
      className={className}
    >
      {children}
    </TableRowTemplate>
  );
}

export default function CppMixesEditorPage() {
  const dispatch = useDispatch();

  const [items, setItems] = useState(['global1', 'global2']);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);
  // const mixes = useAppSelector((state) => state.cppModels.cppConfig?.mixes?.mixBases);

  const currentElement = useAppSelector((state) => state.cppModels.currentElement) as MixBaseEntity;
  // const currentElement = mixes?.find((m) => m.id === currentElementId);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [filteredMixes, setFilteredMixes] = useState<MixBaseEntity[]>();
  const configurationId = useAppSelector((state) => state.configurations.currentConfigurationId);

  const { currentData: mixes } = useGetMixBasesSimpleListQuery(
    configurationId,
    { refetchOnMountOrArgChange: true },
  );

  const [getCurrentMix, {
    data: currentMixFromQuery,
  }] = useLazyGetMixBaseByIdQuery();

  useEffect(() => {
    if (mixes) {
      setFilteredMixes(mixes);
    }
  }, [mixes]);

  useEffect(() => {
    if (currentMixFromQuery) {
      const withIds = {
        ...currentMixFromQuery,
        mixElements: currentMixFromQuery?.mixElements?.map((e, i) => ({
          ...e,
          id: i,
          mixConfigs: e?.mixConfigs?.map((c, index) => ({
            ...c,
            id: index,
          })),
        })),
      };

      dispatch(setCurrentElement(withIds));
    }
  }, [currentMixFromQuery]);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const isValidNumber = SCIENTIFIC_NOTATION_NUMBER.test(value);

    if (isValidNumber || value === '') {
      setName(value);
    }
  };
  const [idError, setIdError] = useState(false);

  const handleIdChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number(e.target.value);
    const newId = Number.isNaN(value) ? 0 : value;

    const oldId = currentElement?.oldId;

    const isIdUnique = (
      !mixes?.some((el) => el.id === newId)
     || newId === oldId);

    if (!isIdUnique) {
      setIdError(true);
      message.error('Смесь с таким идентификатором уже существует!');
    } else {
      setIdError(false);
    }

    const newElement = {
      ...currentElement!,
      id: newId,
      oldId,
    };

    if (newElement) {
      dispatch(setCurrentElement(newElement));
    }
  };

  const dropdownRender = (menu: any) => (
    <>
      {menu}
      <Divider style={{ margin: '8px 0' }} />
      <Space style={{ padding: '0 8px 4px' }}>
        <Input
          placeholder="числовое значение"
          ref={inputRef}
          value={name}
          onChange={onNameChange}
          onKeyDown={(e) => e.stopPropagation()}
        />
        <Button
          type="text"
          icon={<PlusOutlined />}
          // onClick={addItem}
        >
          Добавить
        </Button>
      </Space>
    </>
  );

  const handleRowClick = (e: React.MouseEvent, id: number) => {
    if (id) {
      const stringId = id.toString();
      const getElementData = {
        configurationId,
        id: stringId,
      };
      dispatch(setCurrentElementId(id));
      getCurrentMix(getElementData);
      setSelectedRowKeys([id]);
    }
  };

  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const valueToFind = e.target.value;
    if (valueToFind) {
      const filtered = mixes
        ?.filter((el: MixBaseEntity) => el.id?.toString().includes(valueToFind));
      setFilteredMixes(filtered);
    } else {
      setFilteredMixes(mixes);
    }
  };

  const deleteConfig = (configName: string) => {
    const newElement = {
      ...currentElement!,
      mixConfigs: currentElement?.mixConfigs?.filter((c) => c.name !== configName),
    };
    if (newElement) {
      dispatch(setCurrentElement(newElement));
    }
  };

  const deleteMixElement = (id: number) => {
    const newElement = {
      ...currentElement!,
      mixElements: currentElement?.mixElements?.filter((e) => e.id !== id),
    };
    if (newElement) {
      dispatch(setCurrentElement(newElement));
    }
  };

  const addMixElement = (id: number) => {
    console.log(id, 'iiiiii');
    const newElementConfig = {
      name: 'NewName',
      value: 100,
      id: Math.random(),
    };
    const newElement = {
      ...currentElement!,
      mixElements: currentElement?.mixElements?.map((e) => (e.id === id
        ? {
          ...e,
          mixConfigs: [
            ...e.mixConfigs!,
            newElementConfig,
          ],
        }
        : e)),
    };
    if (newElement) {
      dispatch(setCurrentElement(newElement));
    }
  };

  const editConfig = (
    e: React.ChangeEvent<HTMLInputElement>,
    configName: string,
    key: string,
  ) => {
    const newConfigsList = currentElement?.mixConfigs?.map((c) => (c.name === configName
      ? {
        ...c,
        [key]: e.target.value,
      }
      : c));

    const newElement = {
      ...currentElement!,
      mixConfigs: newConfigsList,
    };
    if (newElement) {
      dispatch(setCurrentElement(newElement));
    }
  };

  const editComponentConfig = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    key: string,
  ) => {
    const newConfigsList = currentElement?.mixElements?.map((el) => (el.id === id
      ? {
        ...el,
        [key]: e.target.value,
      }
      : el));

    const newElement = {
      ...currentElement!,
      mixConfigs: newConfigsList,
    };
    if (newElement) {
      dispatch(setCurrentElement(newElement));
    }
  };

  const { currentData: mixComponents } = useGetCppMixComponentsQuery(
    undefined,
    { refetchOnMountOrArgChange: true },
  );

  const mixComponentsOptions: DefaultOptionType[] = mixComponents
    ?.map((c: any) => ({
      label: c,
      value: c,
    })) || [];

  const addMixConfig = () => {
    const newMixConfigs = currentElement.mixConfigs || [];

    const existingNumbers = newMixConfigs.map((config) => {
      const match = config.name.match(/mixConfig_(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    });

    const nextNumber = getNextNumber(existingNumbers);

    const newConfigName = `mixConfig_${nextNumber}`;

    const newConfig = {
      name: newConfigName,
      value: 100,
    };

    const newElement: MixBaseEntity = {
      ...currentElement,
      mixConfigs: [...newMixConfigs, newConfig],
    };
    dispatch(setCurrentElement(newElement));
  };

  const addComponent = () => {
    const newMixConfigs = currentElement.mixElements || [];

    const newMixElementName = 'acetone';
    const newMixElement = {
      name: newMixElementName,
      mixConfigs: [],
      id: Math.random(),
    };

    const newElement: MixBaseEntity = {
      ...currentElement,
      mixElements: [...newMixConfigs, newMixElement],
    };
    dispatch(setCurrentElement(newElement));
  };

  const columns: ColumnsType<ElementEntity> = [
    {
      title: 'Идентификатор',
      dataIndex: 'id',
      key: 'id',
      width: '40%',
      render: (id: number, record) => (
        <Row
          align="middle"
          justify="space-between"
        >
          {id
            ? (
              <Typography.Text>
                {id}
              </Typography.Text>
            )
            : <div />}
          <DeleteMixBase id={record.id} />
        </Row>
      ),
    },
  ];

  const columns2create = (type?: string): ColumnsType<SimpleEntity> => [
    {
      title: `${type === 'component' ? 'Конфигурация компонента' : 'Конфигурация'}`,
      dataIndex: 'name',
      key: 'name',
      // width: '320px',
      render: (configName: string, record) => (
        <Input
          value={configName}
          bordered={false}
          style={{ width: 300, marginRight: '8px' }}
          onChange={(e) => editConfig(
            e as React.FocusEvent<HTMLInputElement>,
            record?.name,
            'name',
          )}
        />
      ),
    },
    {
      title: 'Значение',
      dataIndex: 'value',
      key: 'value',
      render: (value: string, record) => (
        <Row
          align="middle"
          justify="space-between"
        >
          <Input
            value={value}
            bordered={false}
            style={{ width: 300, marginRight: '8px' }}
            onChange={(e) => editConfig(
            e as React.FocusEvent<HTMLInputElement>,
            record?.name,
            'value',
            )}
          />
          <DeleteButton onClick={() => deleteConfig(record.name)} />
        </Row>
      ),
    },
  ];

  const columns2 = columns2create();
  const columnss = columns2create('component');

  const columns3: ColumnsType<ElementEntity> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      // width: '90%',
      render: (componentName: string, record) => (
        <Row
          align="middle"
          justify="space-between"
          // style={{ width: '95%' }}
        >
          <InputSelectTemplate
            options={mixComponentsOptions}
            defaultValue={componentName}
            bordered={false}
            style={{ width: 300, marginRight: '8px' }}
            // onChange={(e) => editConfig(
            // e as React.FocusEvent<HTMLInputElement>,
            // record?.name,50
            // 'value',
            // )}
          />
          <Row>
            <AddButton onClick={() => addMixElement(record.id)} />
            <DeleteButton onClick={() => deleteMixElement(record.id)} />
          </Row>
        </Row>
      ),
    },
  ];

  const expandedRowRender = (record: any) => (
    <div className="expanded-table">
      <TableWithScroll
        columns={columnss}
        // dataSource={data}
        dataSource={record.mixConfigs}
        size="small"
        rowKey="name"
      />
    </div>
  );
  return (
    <div>
      <div className="cpp-mixes-page">
        {items
          ? (
            <Split
              style={{ display: 'flex', borderTop: '1px solid #d5d5d5' }}
              sizes={[30, 70]}
            >
              <div style={{ minWidth: '330px', padding: '8px 0' }}>
                <Row
                  style={{ paddingBottom: '8px' }}
                  justify="space-between"
                >
                  <AddMixBase
                    openButton={(
                      <AddButton
                        label="Добавить"
                        type="primary"
                      />
        )}
                  />
                  <Input
                    style={{ width: 280 }}
                    placeholder="Поиск"
                    allowClear
                    onChange={handleFilter}
                  />
                </Row>
                <TableWithScroll
                  rowKey="id"
                  dataSource={filteredMixes}
                  columns={columns}
                  onRow={(record) => ({
                    onClick: (e) => handleRowClick(e, record.id!),
                  })}
                  components={{
                    body: {
                      row: TableRow,
                    },
                  }}
                />
              </div>
              <div style={{ minWidth: '600px' }}>
                <div className="cpp-mixes-page__block">
                  <FormTemplate
                    theme="invisible"
                  >
                    <Row
                      style={{ padding: '0 8px 8px' }}
                      justify="start"
                    >

                      <FormItemTemplate
                        label={<BoldText content="Идентификатор" />}
                        style={{ marginRight: '16px' }}
                      >
                        <Input
                          value={currentElement?.id}
                          style={{ width: 300, marginRight: '16px' }}
                          status={idError ? 'error' : undefined}
                          onChange={(e) => handleIdChange(
                            e as React.FocusEvent<HTMLInputElement>,
                          )}
                        />
                      </FormItemTemplate>
                      {/* <FormItemTemplate
                        label={<BoldText content="Название библиотеки" />}
                        style={{ marginRight: '16px' }}
                      >
                        <Input
                          value={currentElement?.lib_name}
                          readOnly
                        />
                      </FormItemTemplate> */}
                    </Row>
                  </FormTemplate>
                </div>
                <div>
                  <Split
                    direction="vertical"
                    gutterSize={10}
                    style={{ height: 'calc(100vh - 245px)', position: 'relative' }}
                    minSize={52}
                  >
                    <div className="scenario-editor__code-block">
                      <Row style={{ marginLeft: '4px', alignItems: 'center' }}>
                        <div className="cpp-elements__subtitle">
                          Конфигурация смеси
                        </div>
                        <AddButton
                          type="primary"
                          size="small"
                          onClick={addMixConfig}
                          label="Добавить"
                        />
                      </Row>
                      {currentElement && (
                      <div style={{ width: 'inherit', height: 'calc(100% - 40px)' }}>
                        <ResizableTable
                          rowKey="name"
                          dataSource={currentElement.mixConfigs}
                          columns={columns2}
                        />
                      </div>
                      )}
                    </div>
                    <div className="scenario-editor__code-block">
                      <Row style={{ marginLeft: '4px', alignItems: 'center' }}>
                        <div className="cpp-elements__subtitle">
                          Компоненты
                        </div>
                        <AddButton
                          type="primary"
                          size="small"
                          label="Добавить"
                          onClick={addComponent}
                        />
                      </Row>
                      {currentElement && (
                      <div style={{ width: 'inherit', height: 'calc(100% - 40px)' }}>
                        <ResizableTable
                          rowKey="id"
                          dataSource={currentElement.mixElements}
                          columns={columns3}
                          expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
                        />
                      </div>
                      )}
                    </div>
                  </Split>
                </div>
              </div>
            </Split>
          ) : (
            <Result
              icon={<DiffOutlined />}
              title="Добавьте элементы"
            />
          )}
      </div>
    </div>
  );
}
