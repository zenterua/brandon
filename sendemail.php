<?php //ob_start();
if(isset($_REQUEST['event']) && $_REQUEST['event']!=''){$event=$_REQUEST['event'];}else{$event='';}
define('SITE_EMAIL', 'test@test.com');
 
    /* recipients */
    $to1= SITE_EMAIL;
    /* subject */
    $subject1 = "Test";
    /* message */
    $message1 = '<table width="100%" border="0" cellspacing="0" cellpadding="0">';

		if( $_POST['name'] != '' ) {  
			$message1 .='
			<tr>
				<td width="33%"><font color="#f35D14" size="2" face="Tahoma">Name:</font></td>
				<td width="67%" height="22"><font color="#333333" size="-1" face="Tahoma">'.$_POST['name'].'</font></td>
			</tr>';	
		}

		if ( $_POST['lastName'] != '' ) {
			$message1 .='
			<tr>
				<td width="33%"><font color="#f35D14" size="2" face="Tahoma">Last Name :</font></td>
				<td width="67%" height="22"><font color="#333333" size="-1" face="Tahoma">'.$_POST['lastName'].'</font></td>
			</tr>';
		}

		if ( $_POST['email'] != '' ) {
			$message1 .='
			<tr>
				<td width="33%"><font color="#f35D14" size="2" face="Tahoma">Email :</font></td>
				<td width="67%" height="22"><font color="#333333" size="-1" face="Tahoma">'.$_POST['email'].'</font></td>
			</tr>';
		}

		if ( $_POST['phone'] != '' ) {
			$message1 .='
			<tr>
				<td width="33%"><font color="#f35D14" size="2" face="Tahoma">Phone :</font></td>
				<td width="67%" height="22"><font color="#333333" size="-1" face="Tahoma">'.$_POST['phone'].'</font></td>
			</tr>';
		}

		if ( $_POST['message'] != '' ) {
			$message1 .='
			<tr>
				<td width="33%"><font color="#f35D14" size="2" face="Tahoma">Message :</font></td>
				<td width="67%" height="22"><font color="#333333" size="-1" face="Tahoma">'.$_POST['message'].'</font></td>
			</tr>';
		}
	$message1 .='</table>';
    /* To send HTML mail, you can set the Content-type header. */
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
     
    mail($to1, $subject1, $message1, $headers);
 
?>