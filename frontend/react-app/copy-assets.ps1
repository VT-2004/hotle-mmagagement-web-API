# Create the assets directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "src\assets"

# Copy the necessary image files
Copy-Item -Path "..\assets\logo.png" -Destination "src\assets\"
Copy-Item -Path "..\assets\header.jpg" -Destination "src\assets\"
Copy-Item -Path "..\assets\room-1.jpg" -Destination "src\assets\"
Copy-Item -Path "..\assets\room-2.jpg" -Destination "src\assets\"
Copy-Item -Path "..\assets\room-3.jpg" -Destination "src\assets\"
Copy-Item -Path "..\assets\about.jpg" -Destination "src\assets\"
Copy-Item -Path "..\assets\destination-1.jpg" -Destination "src\assets\"
Copy-Item -Path "..\assets\destination-2.jpg" -Destination "src\assets\"
Copy-Item -Path "..\assets\destination-3.jpg" -Destination "src\assets\"
Copy-Item -Path "..\assets\review-1.jpg" -Destination "src\assets\"
Copy-Item -Path "..\assets\review-2.jpg" -Destination "src\assets\"
Copy-Item -Path "..\assets\review-3.jpg" -Destination "src\assets\"
Copy-Item -Path "..\assets\service.jpg" -Destination "src\assets\"
Copy-Item -Path "..\assets\explore.jpg" -Destination "src\assets\"
Copy-Item -Path "..\assets\reserved.jpg" -Destination "src\assets\"
Copy-Item -Path "..\assets\facebook.png" -Destination "src\assets\"
Copy-Item -Path "..\assets\instagram.png" -Destination "src\assets\"
Copy-Item -Path "..\assets\twitter.png" -Destination "src\assets\"
Copy-Item -Path "..\assets\youtube.png" -Destination "src\assets\"

# Copy the menu directory if it exists
if (Test-Path "..\assets\menu") {
    Copy-Item -Path "..\assets\menu" -Destination "src\assets\" -Recurse
}

Write-Host "Assets copied successfully!" 