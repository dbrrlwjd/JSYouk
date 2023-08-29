function f_rgbColor(){
    return "rgb("
    + Math.floor(Math.random()*256) + ","
    + Math.floor(Math.random()*256) + ","
    + Math.floor(Math.random()*256)
    + ")";
}

// 전달되어 온 데이터에 대해 key값의 value를 리턴
function getParameter(p_key){
    let v_url = location.href;
    // 주소 내에 ?가 존재하는지 확인
    if(v_url.indexOf('?') != -1){
        let v_queryString = v_url.split('?')[1];

        let v_prams = v_queryString.split('&');

        for(let i=0;i<v_prams.length;i++){
            if(v_prams[i].split('=')[0] == p_key){
                return decodeURIComponent(v_prams[i].split('=')[1]);
            }
        }
    }
}