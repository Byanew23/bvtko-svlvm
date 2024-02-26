import React from 'react'
import { glassesDataType, OmitMultiple } from '../../utils';
import { AddProductForm } from './AddProductForm'
import { uploadItem } from '../../hooks/useSupabaseData'
import { Tabs } from './Tabs';
import { Auth } from './Auth';
import { DeletePage } from './DeletePage';
import './AdminPage.css'

export type Options = "UPLOAD" | "MANAGE" | "AUTH";

export const AdminPage = () => {
    const [state, setState] = React.useState<Options>("AUTH")

    React.useEffect(() => {
        const isAuth = window.localStorage.getItem("Authenticated")
        if (isAuth) {
            setState("UPLOAD")
        } else {
            setState("AUTH")
        }
    }, [])

    const handleSubmit = (values: OmitMultiple<glassesDataType, 'id' | 'in_wishlist'>) => {
        // Handle form submission here, e.g., send data to your backend
        uploadItem(values)
    };

    return (
        <>
            {state !== "AUTH" && <Tabs options={["UPLOAD", "MANAGE"]} changeTab={setState} />}
            {state === "UPLOAD" ? <div>
                <h1>Add Product</h1>
                <AddProductForm onSubmit={handleSubmit} />
            </div>
                : state === "MANAGE" ? <DeletePage /> : <Auth changeTab={() => setState("UPLOAD")} />}
        </>


    );
}