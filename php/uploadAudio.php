<?php
    require('connection.php');

    if(isset($_POST["uploadBtn"])){
        $artist = $_POST["artist"];
        $fileName = $_FILES["audio"]["name"];
        $file = $_FILES["audio"]["tmp_name"];
        $finalFileName = rand(0,100).$fileName;

        $sql = "INSERT INTO all_audio(artist, audioName) VALUES (?,?)";
        $sqli = $conn->prepare($sql);
        $sqli->bind_param("ss",$artist,$finalFileName);

        if($sqli->execute()){
            move_uploaded_file($file,"../audios/$finalFileName");
            header("Location: ../index.html#music");    
        }else{
            echo "error";
        }
        $sqli->close();

    }
?>