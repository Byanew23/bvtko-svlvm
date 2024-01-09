import { useState } from 'react'
import { createClient } from '@supabase/supabase-js';
import { glassesDataType } from '../mockData';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey);

export const getItems = async () => {
    const { data, error } = await supabase
        .from('items')
        .select('*');

    if (error) {
        console.error('Error fetching data:', error.message);
    } else {
        // console.log('Fetched data:', data);
        return data
    }


};

export const getItemById = async (id: string) => {
    const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq("id", id);

    if (error) {
        console.error('Error fetching data:', error.message);
    } else {
        // console.log('Fetched data:', data);
        return data[0] as glassesDataType
    }


};

export const uploadItem = async (values: Omit<glassesDataType, 'id'>) => {

    const { urls, name, description, price } = values
    const { data, error } = await supabase
        .from('items')
        .insert([
            { 'urls': urls, 'name': name, 'description': description, 'price': price, 'ordered': false },
        ])
        .select()

    if (error) {
        console.error('Error fetching data:', error.message);
    } else {

        console.log(data)
    }
}

export const deleteItemById = async (id: string) => {

    const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id)

}

export const setItemOrderStatus = async (id: string, status: boolean) => {
    const { data, error } = await supabase
        .from('items')
        .update({ 'ordered': status })
        .eq('id', id)
        .select()

}


// export const useSupabaseData = () => {

//     const uploadItem = async (values: glassesDataType) => {

//         const { id, urls, name, description, price } = values
//         const { data, error } = await supabase
//             .from('items')
//             .insert([
//                 { 'id': id, 'urls': urls, 'name': name, 'description': description, 'price': price },
//             ])


//         if (error) {
//             console.error('Error fetching data:', error.message);

//         }
//     }

//     const deleteItem = async (id: string) => {

//         const { error } = await supabase
//             .from('items')
//             .delete()
//             .eq('id', id)

//     }

//     return { getData: getImages, upload: uploadItem }
// }