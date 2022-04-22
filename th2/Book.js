import React from "react";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useState } from "react";
import { useEffect } from "react";

function Book() {
    const arrBook = [
        {title: 'book1', quantity: 1},
        {title: 'book2', quantity: 2},
        {title: 'book3', quantity: 3},
    ];
    const [books, setBooks] = useState(arrBook);
    const [form, setForm] = useState({title: '', quantity: 0});
    const [indexSelected, setIndexSelected] = useState(-1);

    const formik = useFormik({
        initialValues: form,
        validationSchema: Yup.object({
            title: Yup.string().required('Required!'),
            quantity: Yup
                .number()
                .min(0, 'Quantity is must a number >= 0')
                .required('Required!')
        }),
        onSubmit: () => {
            console.log(indexSelected);
            let _newBooks = [...books];
            if(indexSelected === -1) {
                _newBooks.push(form);
                setBooks(_newBooks);
            } else {
                _newBooks.splice(indexSelected, 1, form);
                setBooks(_newBooks);
            }
            console.log(_newBooks);
        }
    });

    const handleDelete = (index) => {
        let _newBooks = [...books];
        _newBooks.splice(index, 1);
        setBooks(_newBooks);
    };

    const handleEdit = (id, bookItem) => {
        setForm(bookItem);
        setIndexSelected(id);
    };

    useEffect(() => {
        formik.values.title = form.title;
        formik.values.quantity = form.quantity;
    }, [form])

    const handleChange = (evt) => {
        let _form = {
            ...form,
            [evt.target.name]: evt.target.value
        }
        setForm(_form);
        //formik.handleChange;
    }
    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label>Tiêu đề</label><br/>
                    <input 
                        name='title'
                        type='text'
                        /* value={form.title}
                        onChange={evt => handleChange(evt)} */
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.title && formik.touched.title ? (
                        <p>{formik.errors.title}</p>
                    ) : (
                        null
                    )}
                </div>
                <div>
                    <label>Số lượng</label><br/>
                    <input 
                        name='quantity'
                        type='number'
                        /* value={form.quantity}
                        onChange={evt => handleChange(evt)} */
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.quantity && formik.touched.quantity ? (
                        <p>{formik.errors.quantity}</p>
                    ) : (
                        null
                    )}
                </div>
                <input type='submit'/>
            </form>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((bookItem, id) => {
                            return(
                                <tr key={id}>
                                    <td>{bookItem.title}</td>
                                    <td>{bookItem.quantity}</td>
                                    <td>
                                        <button onClick={evt => handleEdit(id, bookItem)}>Edit</button>
                                        <button onClick={evt => handleDelete(id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Book;