from PIL import Image
import os
from PIL import Image
import os
import shutil

source_folder = '/Users/younsoolim/Desktop/www/Melange/py'
destination_folder = '/Users/younsoolim/Desktop/www/pps/py'

# Iterate over all files and folders in the source folder
for root, dirs, files in os.walk(source_folder):
    for file in files:
        # Get the full path of the file
        file_path = os.path.join(root, file)
        
        # Get the relative path of the file (without the source folder)
        relative_path = os.path.relpath(file_path, source_folder)
        
        # Exclude files and folders with "test" in their name and hidden folders
        if "test" not in file and "test" not in relative_path and not any(part.startswith('.') for part in relative_path.split(os.sep)):
            # Create the destination folder if it doesn't exist
            destination_path = os.path.join(destination_folder, relative_path)
            os.makedirs(os.path.dirname(destination_path), exist_ok=True)
            
            # Copy the file to the destination folder
            shutil.copy(file_path, destination_path)