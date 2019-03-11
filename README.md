# PiStick
Raspberry Pi Zero Powered Smart USB Stick

Hosts an AP with a captive portal. When you connect you can wirelessly upload files to your USB Drive.

# Installation
## Enable USB Driver
Modify /boot/config.txt and add
```
dtoverlay=dwc2
```

Append this to /etc/modules
```
dwc2
```

## Make USB Container File
Make a 2GB bin file. You can change the ammount of MB by changing the count
```
sudo dd bs=1M if=/dev/zero of=/piusb.bin count=2048
```

Format the bin as FAT32
```
sudo mkdosfs /piusb.bin -F 32 -I
```

## Mount container 
Make the directory we'll be using to mount too
```
sudo mkdir /mnt/usb_share
```

Append this to /etc/fstab
```
/piusb.bin  /mnt/usb_share  vfat    users,umask=00  0   02
```

This will mount the driver automatically and allow for error-checking on boot.

## Install Node JS
Download the binaries (Check for latest version [here]())
```
wget https://nodejs.org/dist/v10.15.3/node-v10.15.3-linux-armv6l.tar.xz
```

Extract the tar file
```
tar xvzf node-v10.15.3-linux-armv6l.tar.xz
```

Install Node and NPM
```
cd node-v10.15.3-linux-armv6l/
sudo cp -R * /usr/local/
```

Verify the installation by
```
npm -v
node -v
```

## Install PiStick
Make sure git is installed
```
sudo apt install git -y
```

Clone this repository
```
git clone https://github.com/CPunch/PiStick.git
```

Install Dependencies
```
cd PiStick/PiStick-WebServer
sudo chmod +x install.sh
./install.sh
```

Test and make sure WebServer is running
```
node start.js
```

## Install HostAPD and Make Captive Portal
> Make sure to do this step LAST. After Running an accesspoint you will **NOT** be able to access the internet from your pi after reboot.


