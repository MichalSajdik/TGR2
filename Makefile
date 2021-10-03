build:
	cp src/power.js powerCompile
	touch power
	echo '#!/bin/bash' > power
	echo 'node' 'powerCompile' >> power
	chmod +x power
	cp src/avltree.js avltreeCompile
	touch avltree
	echo '#!/bin/bash' > avltree
	echo 'node' 'avltreeCompile' >> avltree
	chmod +x avltree
	cp src/weakness.js weaknessCompile
	touch weakness
	echo '#!/bin/bash' > weakness
	echo 'node' 'weaknessCompile' >> weakness
	chmod +x weakness
	cp src/reset.js resetCompile
	touch reset
	echo '#!/bin/bash' > reset
	echo 'node' 'resetCompile' >> reset
	chmod +x reset
clean:
	rm -rf power
	rm -rf powerCompile
	rm -rf avltree
	rm -rf avltreeCompile
	rm -rf weakness
	rm -rf weaknessCompile
	rm -rf reset
	rm -rf resetCompile
