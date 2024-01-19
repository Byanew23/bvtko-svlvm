import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { glassesDataType } from '../../mockData';
import { editItem } from '../../hooks/useSupabaseData';

export const EditForm = ({ handleClose, item }: { handleClose: () => void, item: glassesDataType }) => {
    return (
        <Formik

            initialValues={{ name: item.name, price: item.price, description: item.description, urls: item.urls, ordered: item.ordered }}
            onSubmit={(values) => {
                editItem(item.id, values)
                handleClose()
            }}
        >
            {({ setFieldValue }) => (
                <Form className="edit-form">
                    <div className="form-field">
                        <label htmlFor="name">Name:</label>
                        <Field type="text" id="name" name="name" />
                        <ErrorMessage name="name" component="div" />
                    </div>

                    <div className="form-field">
                        <label htmlFor="price">Price:</label>
                        <Field type="number" id="price" name="price" />
                        <ErrorMessage name="price" component="div" />
                    </div>

                    <div className="form-field">
                        <label htmlFor="description">Description:</label>
                        <Field as="textarea" id="description" name="description" />
                        <ErrorMessage name="description" component="div" />
                    </div>

                    <div className="form-field">
                        <label htmlFor="urls">Picture URLs (separate them by ","):</label>
                        <Field
                            as="textarea"
                            id="urls"
                            name="urls"
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                const urls = e.target.value.split(',');
                                setFieldValue('urls', urls);
                            }}
                        />
                        <ErrorMessage name="urls" component="div" />
                    </div>

                    <button className="upload-button" type="submit">Submit</button>
                </Form>
            )}
        </Formik >
    );
};
