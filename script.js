const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
resetFilterBtn = document.querySelector(".reset-filter"),
chooseImgBtn = document.querySelector(".choose-img"),
saveImgBtn = document.querySelector(".save-img");


let brightness = 100, saturation = 100, inversion = 0 , grayscale =0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilters =() => {

    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;

    previewImg.style.filter =   `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

const loadImage = () => {
    let file = fileInput.files[0]; //usuário selecionar a foto
    
    if(!file) return; //retorna se o usuário não selecionou
    
    previewImg.src = URL.createObjectURL(file); //coloca a foto selecionada na tela
    
    previewImg.addEventListener("load",()=>{

        resetFilterBtn.click();

        document.querySelector(".container").classList.remove("disable");
    });
}

filterOptions.forEach(option=>{

    option.addEventListener("click",() =>{//adicionando evento click para os botões de filtrar

        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");

        filterName.innerText = option.innerText;

        if(option.id ==="brightness") {

            filterSlider.max= "200";

            filterSlider.value = `${brightness}`;

            filterValue.innerText = `${brightness}%`;

        } else if(option.id ==="saturation"){

            filterSlider.max= "200";

            filterSlider.value = `${saturation}`;

            filterValue.innerText = `${saturation}%`;

        } else if(option.id ==="inversion"){

            filterSlider.max= "100";

            filterSlider.value = `${inversion}`;

            filterValue.innerText = `${inversion}%`;
        } else{ 
            filterSlider.max= "100";    

            filterSlider.value = `${grayscale}`;

            filterValue.innerText = `${grayscale}%`;

        }
        applyFilters();

    });
});

const updateFilter = () =>{
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");//pegando o filtro selecionado do btn

    if(selectedFilter.id ==="brightness"){
        brightness = filterSlider.value;
    } else if(selectedFilter.id==="saturation"){
        saturation = filterSlider.value;

    } else if(selectedFilter.id==="inversion"){
        inversion = filterSlider.value;

    }
    else{
        grayscale = filterSlider.value;

    }
    applyFilters();
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left") {//rotacionando esquerda
            rotate -= 90;
            
        } else if(option.id === "right") {//rotacionando direita
            rotate += 90;

        } else if(option.id === "horizontal") {//movimento horizontal
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;

        } else {
            flipVertical = flipVertical === 1 ? -1 : 1;//movimento vertical
        }
            applyFilters();
    });
});


const resetFilter = () => {//reset nas variaveis

    brightness = "100"; saturation = "100"; inversion = "0"; grayscale = "0";

    rotate = 0; flipHorizontal = 1; flipVertical = 1;

    filterOptions[0].click();//clicando no brightness, para que ela seja selecionada padrão
    applyFilter();
}

const saveImage = () => {
    const canvas = document.createElement("canvas");//criando elemento

    const ctx = canvas.getContext("2d");//retorna um desenho do canvas

    canvas.width = previewImg.naturalWidth;//Setando a largura no canvas

    canvas.height = previewImg.naturalHeight;//Setando altura no canvas
    
    //aplicando os filtros selecionados do usuario
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;

    ctx.translate(canvas.width / 2, canvas.height / 2);//translacionando canvas a partir do centro

    if(rotate !== 0) {//se não for 0
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);//flipando o canvas

    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");//criando elemento

    link.download = "image.jpg";

    link.href = canvas.toDataURL();

    link.click();

}


filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());


