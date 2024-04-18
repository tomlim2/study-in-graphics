from PIL import Image
import os

def process_images(input_files, output_file):
    # Open the input .png files
    img1 = Image.open(input_files[0])
    img2 = Image.open(input_files[1])
    img3 = Image.open(input_files[2])

    # Get the width and height of the images
    width1, height1 = img1.size
    width2, height2 = img2.size
    width3, height3 = img3.size

    # Create a new image to store the combined result horizontally
    result_img = Image.new('RGB', (width1 + width2 + width3, max(height1, height2, height3)))

    # Paste the three images horizontally onto the result image
    result_img.paste(img1, (0, 0))
    result_img.paste(img2, (width1, 0))
    result_img.paste(img3, (width1 + width2, 0))

    # Save the result image
    result_img.save(output_file)

# Directory containing the images
input_directory = 'py/input/'  # Change this to the directory containing your images

# Output directory for processed images
output_directory = 'py/output/'  # Change this to the directory where you want to save the processed images

# Create the input and output directories if they do not exist
os.makedirs(input_directory, exist_ok=True)
os.makedirs(output_directory, exist_ok=True)

# Get all .png files in the input directory
png_files = sorted([f for f in os.listdir(input_directory) if f.endswith('.png')])
print(png_files)    

# Process every three .png files in the input directory
for i in range(0, len(png_files), 3):
    input_files = [os.path.join(input_directory, png_files[i+j]) for j in range(3)]
    # Use the name of the first file in each group of three for the output file
    output_file = os.path.join(output_directory, f'{os.path.splitext(png_files[i])[0].replace("_1", "")}_All.png')
    process_images(input_files, output_file)