import '../../styles/site.css'

function RightCard(){
    return (
    <div className="card round-button d-flex flex-column align-items-baseline justify-content-end ms-5 me-5" style={{
        backgroundImage:`url(https://appleinsider.ru/wp-content/uploads/2021/10/new_pixel_phone6-750x441.jpg)`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        width:380,
        height:250,
    }}>
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 673.859 261.918">
  <path  d="M8.956,334.69H665.451a8.5,8.5,0,0,0,8.227-8.749h0c0-4.832.486-137.155,0-224.449L69,73.594C43.753,72.638,21.187,69.68.034,86.421l.695,239.52A8.5,8.5,0,0,0,8.956,334.69Z" transform="translate(-0.034 -72.772)" fill="#191919" opacity="0.9"
   style={
       {
       mixBlendMode: 'multiply',
       isolation: 'isolate'
       }}/>
</svg>
    </div>
    );
}

export default RightCard;