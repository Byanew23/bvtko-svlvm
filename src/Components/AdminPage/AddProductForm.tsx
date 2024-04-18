import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { glassesDataType, OmitMultiple } from '../../utils';



export const AddProductForm = ({ onSubmit }: { onSubmit: (values: OmitMultiple<glassesDataType, 'id' | 'in_wishlist' | 'is_album' | 'available_qty'>) => void }) => {
    return (
        <Formik
            initialValues={{ name: '', price: 0, description: '', urls: [], ordered: false }}
            onSubmit={(values, { resetForm }) => {
                onSubmit(values)
                resetForm()
            }}
        >
            {({ setFieldValue }) => (
                <Form>
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
