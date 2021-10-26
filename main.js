Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

  camera = document.getElementById("camera");

Webcam.attach( '#camera' );

      
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ZmHwCR8Nf/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');
  }
      
  function result()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    
    document.getElementById("result_emotion_name").innerHTML = results[0].label;

    gesture = results[0].label;
    
    toSpeak = "";
    
    if(gesture == "thumbup")
    {
      toSpeak = "This is looking your thumb is up";
      document.getElementById("update_emoji").innerHTML = "&#9994;";
    }
    else if(gesture == "closed")
    {
      toSpeak = "your hand seems closed";
      document.getElementById("update_emoji").innerHTML = "&#9995;";
    }
    else if(gesture == "open")
    {
      toSpeak = "Your hand is open";
      document.getElementById("update_emoji").innerHTML = "&#9996;";
    }

else if(gesture == "twofingers")
{
  toSpeak = "your two fingers seems to be open";
  document.getElementById("update_emoji").innerHTML = "&#128070;";
}
    speak();
  }
}


function speak(){
    var synth = window.speechSynthesis;

    speak_data = toSpeak;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

}

