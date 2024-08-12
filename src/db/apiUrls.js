import { UAParser } from "ua-parser-js";
import supabase, { supabaseUrl } from "./supabase";
import { original } from "@reduxjs/toolkit";


export async function getUrls(user_id){
    const {data,error} = await supabase.from('urls').select('*').eq('user_id',user_id);

    if(error) {
        console.error(error.message);
        throw new Error("Unable to load urls");
    }
   
    return data;


}
 export async function deleteUrl(id){
    const {data,error} = await supabase.from('urls').delete().eq('id',id);
  
    if(error) {
        console.error(error.message);
        throw new Error("Unable to load urls");
    }
   
    return data;
  
  
  }


  export async function  createUrl({title,longUrl,customUrl,user_id},qrcode) {

    const short_url = Math.random().toString(36).substring(2,6);

    const fileName = `qr-${short_url}`;

    const {error:storageError} = await supabase.storage.from('qr').upload(fileName,qrcode);

    if(storageError) throw new Error(storageError.message);

    const qr = `${supabaseUrl}/storage/v1/object/public/qr/${fileName}`;

    const {data,error} = await supabase.from('urls').insert([{
        title,
        user_id,
        original : longUrl,
        custorm_url : customUrl ||null,
        short_url,
        qr
    }]).select();

    if(error){
        console.error(error);
        if(error.message === "duplicate key value violates unique constraint \"urls_custorm_url_key\""
){throw new Error("Entered custom url already exists")}
        throw new Error("Error creating short URL")
    }

    return data;
  }


  export async function getLongUrl(id) {
    let {data: shortLinkData, error: shortLinkError} = await supabase
      .from("urls")
      .select("id, original")
      .or(`short_url.eq.${id},custorm_url.eq.${id}`)
      .single();
  
    if (shortLinkError && shortLinkError.code !== "PGRST116") {
      console.error("Error fetching short link:", shortLinkError);
      return;
    }
  
    return shortLinkData;
  }


  export async function getUrl({id, user_id}) {
    const {data, error} = await supabase
      .from("urls")
      .select("*")
      .eq("id", id)
      .eq("user_id", user_id)
      .single();
  
    if (error) {
      console.error(error);
      throw new Error("Short Url not found");
    }
  
    return data;
  }