"use client"

import PageTitleComponent from "@/app/components/page-title-component";
import { PlusOutlined, SearchOutlined, SaveOutlined, CloseOutlined, EditOutlined,
DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Input, Modal, message, Spin, Popconfirm, PopconfirmProps } from "antd";
import { secondaryColor, primaryColor, infoColor, errorColor } from "../../constant/constant";
import { useState, useEffect } from "react";
import { userServiceStore } from "../../store/service.store";
import { Subscription, tap, catchError, EMPTY } from "rxjs";
import { Category } from "../../interfaces/category";

export default function CategoryPage() {

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const [nameControl, setNameControl] = useState("");

  const [searchControl, setSearchControl] = useState("");

  const categoryService = userServiceStore((state) => state.categoryService);

  const [messageApi, contextHolder] = message.useMessage();

  const subscription = new Subscription();

  const [isLoadingSubmit, setLoadingSubmit] = useState(false);

  const [isLoadingInitialize, setLoadingInitialize] = useState(false);

  const [dataList, setDataList] = useState<Category[]>([]);

  const clearFormControl = () => {
    setNameControl("");
  }

  const openCreateModal = () => {
    setIsModalCreateOpen(true);
  };

  const closeCreateModal = () => {
    setIsModalCreateOpen(false);
  }

  const initialize = () => {
    setLoadingInitialize(true);
    const initializeSubscription = categoryService.searchPaginate(1, searchControl).pipe(
      tap(data => {
        setDataList(data.data);
        setLoadingInitialize(false);
      }),
      catchError((e) => {
        setLoadingInitialize(false);

        messageApi.open({
          type: "error",
          content: `${e.message}`
        });

        return EMPTY;
      })
    ).subscribe();

    subscription.add(initializeSubscription);
  }

  const create = () => {
    setLoadingSubmit(true);
    const createSubscription = categoryService.create({
      name: nameControl
    }).pipe(
      tap(data => {
        messageApi.open({
          type: data.success ? "success" : "error",
          content: `${data.message}`
        });

        setLoadingSubmit(false);

        closeCreateModal();

        clearFormControl();

        initialize();
      }),
      catchError((e) => {
        messageApi.open({
          type: "error",
          content: `${e.message}`
        });
        setNameControl("");
        setLoadingSubmit(false);
      })
    ).subscribe();

    subscription.add(createSubscription);
  }


  const deleteData = (index: number, id: number): void => {
    const deleteSubscription = categoryService.delete(id).pipe(
      tap(response => {
        messageApi.open({
          type: response.success ? "success" : "error",
          content: `${response.message}`
        });

        initialize();
      }),
      catchError((e) => {
        messageApi.open({
          type: "error",
          content: `${e.message}`
        });

        return EMPTY;
      })
    ).subscribe();

    subscription.add(deleteSubscription);
  }

  useEffect(() => {
    initialize();
    return () => {
      subscription.unsubscribe();
    }
  }, []);


  return (
    <>
      { contextHolder }

      <Modal 
        title="Add Category" 
        width={ 800 }
        open={ isModalCreateOpen } onOk={ closeCreateModal } onCancel={ closeCreateModal }
        okButtonProps={
          {
            disabled: !nameControl,
            icon: <SaveOutlined />
          }
        }
        cancelButtonProps={
          {
            danger: true,
            icon: <CloseOutlined />
          }
        } 
        okText="Add Category"
        onOk={ create }
      >
        <div className="p-2">
          <Spin spinning={ isLoadingSubmit } tip="Processing..." size="large">
            <div className="text-base font-semibold mb-2">Name</div>
            <Input size="large" placeholder="Category Name" value={ nameControl } 
            onChange={
              (e) => {
                setNameControl(e.target.value)
              }
            } />
          </Spin>
        </div>
      </Modal>

      <PageTitleComponent title="Category" subtitle="Dashboard"></PageTitleComponent>
      <div className="mt-3">
        <Card>
          <div className="flex flex-row justify-content-between align-items-center mb-3">
            <Button onClick={ openCreateModal } type="primary" style={
                {
                  color: `${primaryColor}`,
                  background: secondaryColor
                }
              } size="large" icon={ <PlusOutlined />}>
              Add Data
            </Button>
            <Input className="w-4" placeholder="Search Data..." size="medium" prefix={ <SearchOutlined /> } />
          </div>
          <div className="table-container">
            <table className="table is-fullwidth is-hoverable is-striped">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                { dataList.map((d, index) => (
                  <tr key={ index }>
                    <td>{ index + 1 }</td>
                    <td>{ d.name }</td>
                    <td>
                      <div className="flex flex-row align-items-center gap-2">
                        <Button 
                        style={
                          {
                            border: `1px solid ${infoColor}`
                          }
                        }
                        icon={ <EditOutlined style={
                          {
                            color: infoColor
                          }
                        } />} />
                        <Popconfirm title="Delete Category" description={
                          `Are you sure want to delete this "${d.name}"" Category Data???`
                        } 
                        okText="Delete" 
                        cancelText="Cancel"
                        onConfirm={ 
                          (e) => {
                            deleteData(index, d.id);
                          }
                        }
                        >
                          <Button
                          style={
                            {
                              border: `1px solid ${errorColor}`
                            }
                          }
                          icon={ <DeleteOutlined style={
                            {
                              color: errorColor
                            }
                          } /> } />
                        </Popconfirm>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  )
}