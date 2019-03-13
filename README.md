# PiStick
Raspberry Pi Zero Powered Smart USB Stick

Hosts an AP with a captive portal. When you connect you can wirelessly upload files to your USB Drive.

# Usage
This allows you to plug into any usb port (TV, Laptop, etc.) and wirelessly transfer files to a virtual USB Flash drive. This lets you play videos from your phone on your TV, upload your favorite photos and share with others. You can also download uploaded data from the captive portal, delete files to make more space, or even tell others to connect to it so they can download data. 

# Installation
## Before installing, make sure everything is up-to-date
```
sudo apt update
sudo apt upgrade -y
```

## Enable USB Driver
Modify /boot/config.txt and add
```
dtoverlay=dwc2
```

Append this to /etc/modules & reboot to load the module
```
dwc2
```

## Make USB Container File
Make a 2GB bin file. You can change the ammount of MB by changing the count (this may take a while)
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
Download the binaries (Check for latest version [here](https://nodejs.org/en/download/))
```
wget https://nodejs.org/dist/v10.15.3/node-v10.15.3-linux-armv6l.tar.xz
```

Extract the tar file
```
tar xf node-v10.15.3-linux-armv6l.tar.xz
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

Go back to your home dir
```
cd ~
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
sudo node start.js
```

Now we need to make sure it starts when booting, edit /etc/rc.local and put this right before `exit 0`
```
cd /home/Pi/PiStick/PiStick-WebServer
node start.js &
```

## Install HostAPD and make the Captive Portal
> Make sure to do this step LAST. After running an accesspoint you will **NOT** be able to access the internet from your pi after reboot.

Install dnsmasq and hostapd
```
sudo apt-get install dnsmasq hostapd
```

Setup static address in dhcpcd, append this to /etc/dhcpcd.conf
```
interface wlan0
    static ip_address=192.168.4.1/24
    nohook wpa_supplicant
```

Setup DNSMASQ, move conf file and make a new one.
```
sudo mv /etc/dnsmasq.conf /etc/dnsmasq.conf.orig  
sudo nano /etc/dnsmasq.conf
```

Type or copy this into the file
```
interface=wlan0      # Use the require wireless interface - usually wlan0
  dhcp-range=192.168.4.2,192.168.4.20,255.255.255.0,24h
address=/#/192.168.4.1 # redirect to our captive portal
```

That configures the addresses to lease and the lease time. It also redirects all traffic to our captive portal!

Now, configure hostapd located at /etc/hostapd/hostapd.conf
```
interface=wlan0
driver=nl80211
ssid=pistick
country_code=US
hw_mode=g
channel=7
wmm_enabled=0
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=2
wpa_passphrase=Pi_Stick
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP
```

Defaults:
SSID: pistick
Passphrase: Pi_Stick
> Feel free to change this!

Now we need to tell hostapd where to find that file, edit /etc/default/hostapd and add this at the top
```
DAEMON_CONF="/etc/hostapd/hostapd.conf"
```

Now you need to reload the services.
```
sudo systemctl enable dnsmasq
sudo systemctl enable hostapd
```

>*NOTE* if you get an error about hostapd.service being masked, run this:
> ```
> sudo systemctl unmask hostapd
> sudo systemctl daemon-reload
> sudo systemctl start hostapd
> sudo systemctl enable hostapd
> ```

## Now the installation is done, reboot!
```
sudo reboot
```