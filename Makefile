all: build copy_assets

build:
	electron-packager . SoundCloudPlayer --asar --platform=darwin --arch=x64 --version=0.28.1 --overwrite

copy_assets:
	cp assets/app_icon.icns SoundCloudPlayer-darwin-x64/SoundCloudPlayer.app/Contents/Resources/atom.icns