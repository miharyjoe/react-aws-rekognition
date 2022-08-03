const facePosition = (e: any, dataList: any)=>{

    const newTop = ((e.currentTarget.clientTop * dataList.BoundingBox.Top))
    const newLeft = ((e.currentTarget.clientWidth * dataList.BoundingBox.Left))
    const newWidth = (e.currentTarget.clientWidth * dataList.BoundingBox.Width)
    const newHeight = (e.currentTarget.clientHeight * dataList.BoundingBox.Height)


    document.documentElement.style.setProperty('--width', newWidth+"px");
    document.documentElement.style.setProperty('--height', newHeight+"px");
    document.documentElement.style.setProperty('--left', newLeft+"px");
    document.documentElement.style.setProperty('--top', newTop+"px");
}

export default facePosition;